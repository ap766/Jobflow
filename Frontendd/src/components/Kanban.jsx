import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import JobContext from "../context/JobContext";
import Column from "./Column";
import { useAuthContext } from "../hooks/useAuthContext";
import { useBrdsContext } from "../hooks/useBrdsContext";
import BoardIdContext from "../context/BoardIdContext";

export default function Kanban() {
    const { brds } = useBrdsContext();
    const { BoardId, setBoardId } = React.useContext(BoardIdContext);
    const { user } = useAuthContext();

    const { interested, setInterested, applied, setApplied,  interview, setInterview,final, setFinal } = React.useContext(JobContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`api/JobAppSteps/${BoardId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const json = await response.json();

                let interested = json.filter((task) => task.section === "INTERESTED");
                let applied = json.filter((task) => task.section === "APPLIED");
                let rounds = json.filter((task) => task.section === "ROUNDS/INTERVIEWS");
                let final = json.filter((task) => task.section === "FINAL");

                setApplied(interested);
                setInterested(applied);
                setInterview(rounds);
                setFinal(final);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [user.token, setApplied, setInterested, setFinal, setInterview, BoardId]);
    const Notification = async () => { try {
        const response = await fetch(`api/JobAppSteps/`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`
            },
            body: JSON.stringify({ receiveNotifications: true }) // Moved outside of headers
        });
    
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        const json = await response.json();
        console.log("eh");
        console.log(json);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
    }    


    const handleDragEnd = async (result) => {
        const { destination, source, draggableId } = result;
        if (!destination || source.droppableId === destination.droppableId) return;

        const task = findItemById(draggableId, [...applied, ...interested, ...interview, ...final]);

        const updatedTask = { ...task }; // Create a copy of the task object

        switch (destination.droppableId) {
            case "1":
                updatedTask.section = "INTERESTED";
                break;
            case "2":
                updatedTask.section = "APPLIED";
                break;
            case "3":
                updatedTask.section = "ROUNDS/INTERVIEWS";
                break;
            case "4":
                updatedTask.section = "FINAL";
                break;
        }

        // Make a PATCH request to update the task status on the backend
        try {
            await fetch(`api/JobAppSteps/${draggableId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    section: updatedTask.section,
                }),
            });

            // Update the state after the PATCH request is successful
            switch (updatedTask.section) {
                case "INTERESTED":
                    setApplied(prevApplied => [...prevApplied, updatedTask]);
                    break;
                case "APPLIED":
                    setInterested(prevInterested=> [...prevInterested, updatedTask]);
                    break;
                case "ROUNDS/INTERVIEWS":
                    setInterview(prevInterview => [...prevInterview, updatedTask]);
                    break;
                case "FINAL":
                    setFinal(prevFinal => [...prevFinal, updatedTask]);
                    break;
            }

            // Remove the task from the previous section
            deletePreviousState(source.droppableId, draggableId);
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    function deletePreviousState(sourceDroppableId, taskId) {
        switch (sourceDroppableId) {
            case "1":
                setApplied(prevApplied => removeItemById(taskId, prevApplied));
                break;
            case "2":
                setInterested(prevInterested => removeItemById(taskId, prevInterested));
                break;
            case "3":
                setInterview(prevInterview => removeItemById(taskId, prevInterview));
                break;
            case "4":
                setFinal(prevFinal => removeItemById(taskId, prevFinal));
                break;
        }
    }

    function findItemById(id, array) {
        return array.find((item) => item.id === id);
    }

    function removeItemById(id, array) {
        return array.filter((item) => item.id !== id);
    }

    return (
        <div style={{ display: "flex" }}>
            <DragDropContext onDragEnd={handleDragEnd}>
                <div>
                    <h2 style={{ textAlign: "center" }}>TRACK THE PROGRESS</h2>
<h5 style={{marginLeft:"800px" }}>Stay updated on your scheduled times by clicking this button for notifications</h5>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
            
                    <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
    <img src={require('./arrow.png')} alt="Arrow" style={{ marginRight: "5px" ,height:"80px"}} />
    <button onClick={Notification} style={{ borderRadius: "50%", padding: "10px", backgroundColor: "#007bff", color: "#fff", border: "none", cursor: "pointer" }}>
        <h3>CLICK</h3>
    </button>
</div>

</div>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexDirection: "row",
                            width: "1300px",
                            margin: "0 auto"
                        }}
                    >
                        <Column title={"INTERESTED"} tasks={applied} id={"1"} />
                        <Column title={"APPLIED"} tasks={interested} id={"2"} />
                        <Column title={"ROUNDS/INTERVIEWS"} tasks={interview} id={"3"} />
                        <Column title={"FINAL"} tasks={final} id={"4"} />
                    </div>
                </div>
            </DragDropContext>
        </div>
    );
}
