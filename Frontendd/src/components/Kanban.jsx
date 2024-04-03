import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import TaskContext from "../context/TaskContext";
import Column from "./Column";
import { useAuthContext } from "../hooks/useAuthContext";
import { useBrdsContext } from "../hooks/useBrdsContext";
import BoardIdContext from "../context/BoardIdContext";

export default function Kanban() {
    const { brds } = useBrdsContext();
    const { BoardId, setBoardId } = React.useContext(BoardIdContext);
    const { user } = useAuthContext();

    const { completed, setCompleted, incomplete, setIncomplete, backlog, setBacklog, inReview, setInReview } = React.useContext(TaskContext);

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
                let heardBack = json.filter((task) => task.section === "HEARDBACK");

                setIncomplete(interested);
                setCompleted(applied);
                setBacklog(rounds);
                setInReview(heardBack);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [user.token, setIncomplete, setCompleted, setBacklog, setInReview, BoardId]);
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

        const task = findItemById(draggableId, [...incomplete, ...completed, ...inReview, ...backlog]);

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
                updatedTask.section = "HEARDBACK";
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
                    setIncomplete(prevIncomplete => [...prevIncomplete, updatedTask]);
                    break;
                case "APPLIED":
                    setCompleted(prevCompleted => [...prevCompleted, updatedTask]);
                    break;
                case "ROUNDS/INTERVIEWS":
                    setInReview(prevInReview => [...prevInReview, updatedTask]);
                    break;
                case "HEARDBACK":
                    setBacklog(prevBacklog => [...prevBacklog, updatedTask]);
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
                setIncomplete(prevIncomplete => removeItemById(taskId, prevIncomplete));
                break;
            case "2":
                setCompleted(prevCompleted => removeItemById(taskId, prevCompleted));
                break;
            case "3":
                setInReview(prevInReview => removeItemById(taskId, prevInReview));
                break;
            case "4":
                setBacklog(prevBacklog => removeItemById(taskId, prevBacklog));
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
                        <Column title={"INTERESTED"} tasks={incomplete} id={"1"} />
                        <Column title={"APPLIED"} tasks={completed} id={"2"} />
                        <Column title={"ROUNDS/INTERVIEWS"} tasks={inReview} id={"3"} />
                        <Column title={"HEARDBACK"} tasks={backlog} id={"4"} />
                    </div>
                </div>
            </DragDropContext>
        </div>
    );
}
