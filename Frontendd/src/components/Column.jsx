import { v4 as uuidv4 } from 'uuid';
import React from "react";
import styled from "styled-components";
import Card from "./Card";
import "./scroll.css";
import JobContext from "../context/JobContext";
import { Droppable } from "react-beautiful-dnd";
import { useAuthContext } from "../hooks/useAuthContext"
import BoardIdContext from '../context/BoardIdContext';


const AddButton = styled.button`
    position: absolute;
    top: 8px; /* Adjust as needed */
    right: 8px; /* Adjust as needed */
    background-color: #fff;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    padding: 5px;
    border-radius: 500%;
`;


const Container = styled.div`
    background-color: #f4f5f7;
    border-radius: 2.5px;
    width: 400px;
    height: 900px;
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    border: 1px solid gray;
`;

const Title = styled.h3`
    padding: 8px;
    background-color: pink;
    text-align: center;
`;

const CardList = styled.div`
    padding: 3px;
    transistion: background-color 0.2s ease;
    background-color: #f4f5f7;
    flex-grow: 1;
    min-height: 100px;
`;

export default function Column({ title, cards, id }) {
    //the header id refers to for the column
    const {user} = useAuthContext()
    const { BoardId, setBoardId } = React.useContext(BoardIdContext);
    const { interested,setInterested,applied,setApplied,interview,setInterview ,final,setFinal,} = React.useContext(JobContext);
    console.log("these are the cards")
    console.log(cards)
    console.log(title)
    

    const handleAddButtonClick = async () => {
        const newId = uuidv4();
        // Create a new card object with a unique ID and default title
        const newCard = {
            title: "Untitled",     
            section: title,
            id: newId
            // Assuming default is applied
        };
    console.log("heiii")
        // Depending on the column's ID, update the corresponding state
        switch (id) {
            case "1": // INTERESTED
                setApplied(prevApplied => [newCard, ...prevApplied]);
                break;
            case "2": // APPLIED
                setInterested(prevInterested => [newCard, ...prevInterested]);
                break;
            case "3": // ROUNDS/INTERVIEWS
                setInterview(prevInterview => [newCard, ...prevInterview]);
                break;
            case "4": // FINAL
                setFinal(prevFinal => [newCard, ...prevFinal]);
                break;
            default:
                break;
        }
    
 console.log("Hello we are here in button click");
 console.log("Pls luck be on my side")
 const combinData = { ...newCard, board_id: BoardId };
 console.log(combinData)

        //Storing a new Application called untitled in the database
        try {
            const response = await fetch("/api/JobAppSteps/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}` // Include user token in the header
                },
                
                body: JSON.stringify(combinData) // Convert newCard to JSON string
            });
            if (response.ok) {
                console.log("Card added successfully so gud");
            }
    
            if (!response.ok) {
                throw new Error("Failed to add new card");
            }
          
        } catch (error) {
            console.log("ERROR LAND")
            console.error("Error adding new card:", error);
        }
    };
    


    return (
        <Container className="column">
            <Title
                style={{
                    backgroundColor: "lightblue",
                    position: "sticky",
                    
                }}
            >
                {title}
                 {/* + Button */}
                 <AddButton onClick={handleAddButtonClick}> + </AddButton>
            </Title>
            <Droppable droppableId={id}>
                {(provided, snapshot) => (
                    <CardList
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        isDraggingOver={snapshot.isDraggingOver}
                    >

                        {cards.map((card, index) => (
                            <Card key={index} index={index} card={card} column={title}/>
                        ))} 


                        {provided.placeholder}
                    </CardList>
                )}
            </Droppable>
        </Container>
    );

}