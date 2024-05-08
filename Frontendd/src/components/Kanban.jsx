
//GET cards  - as per boardid

//This is the component that is used to render the kanban board( used to keep track of different Applications)
//This component is used to render the columns and the cards in the columns

//UPDATE card section based on the card's id field of db

//This component is used to update the section of the card when it is dragged and dropped in a different column


import React, { useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import { useAuthContext } from "../hooks/useAuthContext";
import JobContext from "../context/JobContext"; 
import BoardIdContext from "../context/BoardIdContext";

export default function Kanban() {
    
    //The BoardId is used to fetch specific data related to a particular Kanban board,basically jobs/interships as per your search
    const { BoardId} = React.useContext(BoardIdContext);
    
    //User property extracted from the object(value provided by AuthContext.Provider) which currents current state of the authentication context and a dispatch function to update that state
    const { user } = useAuthContext();

    //interested,applied,interview,final are the states that are used to store the data fetched from the backend and they are global
    const { interested, setInterested, applied, setApplied,  interview, setInterview,final, setFinal } = React.useContext(JobContext);
    
    useEffect(() => {
         
        const fetchData = async () => {

            //It makes an HTTP GET request to the api/JobAppSteps/${BoardId} endpoint using the fetch API.
            try {
                const response = await fetch(`api/JobAppSteps/${BoardId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                
                //If the response is not okay (HTTP status code other than 200-299), it throws an error.
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
    
                const json = await response.json();
               
                // [
                //     {
                //       "_id": "6639b1b21a89d0b133a563ac",
                //       "title": "Adobe winter intern",
                //       "section": "APPLIED",
                //       "roundtiming": ["someValue"],
                //       "user_id": "663920beb01c022530c57813",
                //       // Other properties...
                //     }
                //   ]
                  
                let interested = json.filter((card) => card.section === "INTERESTED");
                let applied = json.filter((card) => card.section === "APPLIED");
                let rounds = json.filter((card) => card.section === "ROUNDS/INTERVIEWS");
                let final = json.filter((card) => card.section === "FINAL");

                 /*So if we dont do this, then the the recent stuff is fetched weirdly,context works like that? shows the old stuff too?,see changing boardid should fetch newly na, but yeah to reflect , understood*/ 
                setApplied(applied);
                setInterested(interested);
                setInterview(rounds);
                setFinal(final);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [BoardId]);
    //So if we remove boardId , here it doesnt get its components, so whenver we change board indication to GET again 

    /*[user.token, setApplied, setInterested, setFinal, setInterview, BoardId]);*/
   


    //The different function here include Notification, handleDragEnd,deletePreviousState,findItemById,removeItemById(last 2 based on id of db)
    const Notification = async () => { try {
        const response = await fetch(`api/JobAppSteps/`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`
            },
            //Its a function that converts a JavaScript object into a JSON string. This is necessary because HTTP is a text-based protocol and cannot directly send JavaScript objects
            body: JSON.stringify({ receiveNotifications: true }) // Moved outside of headers
        });
    
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        const json = await response.json();;
        console.log(json);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
    }    

    //The handleDragEnd function is called when a card is dropped in a different column
    //So it is required so that when the drag and drop is done , it reflects(does not show in the old column(through deletePreviousState function) but also shows in new column)
    //It also makes the change to the db
    const handleDragEnd = async (result) => {
        const { destination, source, draggableId } = result;

        // If the card was not moved 
        if (!destination || source.droppableId === destination.droppableId) return;

        //It then finds the card that was dragged using the findItemById function and makes a copy of it.
        //The id here is actually a field in the database and we match it with the entire card to update the section
        const card = findItemById(draggableId, [...interested,...applied,  ...interview, ...final]);

        const updatedCard = { ...card }; //Copy
        
        //It then updates the section property of the card based on the destination column
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
                    setInterested(prevInterested=> [...prevInterested, updatedCard]);
                    break;
                case "APPLIED":
                    setApplied(prevApplied => [...prevApplied, updatedCard]);
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
                setInterested(prevInterested => removeItemById(cardId, prevInterested));
                break;
            case "2":
                setApplied(prevApplied => removeItemById(cardId, prevApplied));
                break;
            case "3":
                setInterview(prevInterview => removeItemById(cardId, prevInterview));
                break;
            case "4":
                setFinal(prevFinal => removeItemById(cardId, prevFinal));
                break;
        }
    }


    //These are helper functions to find card by its id and remove by id
    function findItemById(id, array) {
        return array.find((item) => item.id === id);
    }

    function removeItemById(id, array) {
        return array.filter((item) => item.id !== id);
    }


    //DragDropContext wraps around the part of your application where you want to enable drag and drop functionality.
    //All draggable and droppable components must be children of DragDropContext.
    //It has several props that you can use to handle different stages of the drag and drop operation, such as onDragStart, onDragUpdate, and onDragEnd. 
    //We use onDragEnd which is used to handle the end of a drag operation, which is when a user drops an item they were dragging.
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
                        <Column title={"INTERESTED"} cards={interested} id={"1"} />
                        <Column title={"APPLIED"} cards={applied} id={"2"} />
                        <Column title={"ROUNDS/INTERVIEWS"} cards={interview} id={"3"} />
                        <Column title={"FINAL"} cards={final} id={"4"} />
                    </div>
                </div>
            </DragDropContext>
        </div>
    );
}
