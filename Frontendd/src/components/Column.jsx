//POST 
//to create new cards with Untitled title

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

    //The BoardId is used to fetch specific data related to a particular Kanban board,basically jobs/interships as per your search
    const {BoardId} = React.useContext(BoardIdContext);

    //User property extracted from the object(value provided by AuthContext.Provider) which currents current state of the authentication context and a dispatch function to update that state
    const {user} = useAuthContext()

    //interested,applied,interview,final are the states that are used to store the data fetched from the backend and they are global
    const { setInterested,setApplied,setInterview ,setFinal} = React.useContext(JobContext);
   

    //Functions here include - AddNewCard


    
    const AddNewCard = async () => {

        const newId = uuidv4();

        // Create a new card object with a unique ID and default title
        const newCard = {
            title: "Untitled",     
            section: title,
            id: newId
        };


        // Depending on the column's ID, update the corresponding state
        switch (id) {
            case "1": // INTERESTED
                setInterested(prevInterested => [newCard, ...prevInterested]);
                break;
            case "2": // APPLIED
                setApplied(prevApplied => [newCard, ...prevApplied]);
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


        // Combine new card with the board ID
        const combinData = { ...newCard, board_id: BoardId };
       

        //Storing a new Application called untitled in the database
        try {
            const response = await fetch("https://jobflow-bo2c.onrender.com/api/JobAppSteps/", {
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
    
                 <AddButton onClick={AddNewCard}> + </AddButton>
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