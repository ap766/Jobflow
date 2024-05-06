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

                let interested = json.filter((card) => card.section === "INTERESTED");
                let applied = json.filter((card) => card.section === "APPLIED");
                let rounds = json.filter((card) => card.section === "ROUNDS/INTERVIEWS");
                let final = json.filter((card) => card.section === "FINAL");

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

        const card = findItemById(draggableId, [...applied, ...interested, ...interview, ...final]);

        const updatedCard = { ...card }; // Create a copy of the card object

        switch (destination.droppableId) {
            case "1":
                updatedCard.section = "INTERESTED";
                break;
            case "2":
                updatedCard.section = "APPLIED";
                break;
            case "3":
                updatedCard.section = "ROUNDS/INTERVIEWS";
                break;
            case "4":
                updatedCard.section = "FINAL";
                break;
        }

        // Make a PATCH request to update the card status on the backend
        try {
            await fetch(`api/JobAppSteps/${draggableId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    section: updatedCard.section,
                }),
            });

            // Update the state after the PATCH request is successful
            switch (updatedCard.section) {
                case "INTERESTED":
                    setApplied(prevApplied => [...prevApplied, updatedCard]);
                    break;
                case "APPLIED":
                    setInterested(prevInterested=> [...prevInterested, updatedCard]);
                    break;
                case "ROUNDS/INTERVIEWS":
                    setInterview(prevInterview => [...prevInterview, updatedCard]);
                    break;
                case "FINAL":
                    setFinal(prevFinal => [...prevFinal, updatedCard]);
                    break;
            }

            // Remove the card from the previous section
            deletePreviousState(source.droppableId, draggableId);
        } catch (error) {
            console.error("Error updating card:", error);
        }
    };

    function deletePreviousState(sourceDroppableId, cardId) {
        switch (sourceDroppableId) {
            case "1":
                setApplied(prevApplied => removeItemById(cardId, prevApplied));
                break;
            case "2":
                setInterested(prevInterested => removeItemById(cardId, prevInterested));
                break;
            case "3":
                setInterview(prevInterview => removeItemById(cardId, prevInterview));
                break;
            case "4":
                setFinal(prevFinal => removeItemById(cardId, prevFinal));
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
                        <Column title={"INTERESTED"} cards={applied} id={"1"} />
                        <Column title={"APPLIED"} cards={interested} id={"2"} />
                        <Column title={"ROUNDS/INTERVIEWS"} cards={interview} id={"3"} />
                        <Column title={"FINAL"} cards={final} id={"4"} />
                    </div>
                </div>
            </DragDropContext>
        </div>
    );
}
