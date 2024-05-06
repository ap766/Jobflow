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

const TaskList = styled.div`
    padding: 3px;
    transistion: background-color 0.2s ease;
    background-color: #f4f5f7;
    flex-grow: 1;
    min-height: 100px;
`;

export default function Column({ title, tasks, id }) {
    //the header id refers to for the column
    const {user} = useAuthContext()
    const { BoardId, setBoardId } = React.useContext(BoardIdContext);
    const { interested,setInterested,applied,setApplied,interview,setInterview ,final,setFinal,} = React.useContext(JobContext);
    console.log("these are the tasks")
    console.log(tasks)
    console.log(title)
    

    const handleAddButtonClick = async () => {
        const newId = uuidv4();
        // Create a new task object with a unique ID and default title
        const newTask = {
            title: "Untitled",     
            section: title,
            id: newId
            // Assuming default is applied
        };
    console.log("heiii")
        // Depending on the column's ID, update the corresponding state
        switch (id) {
            case "1": // INTERESTED
                setApplied(prevApplied => [newTask, ...prevApplied]);
                break;
            case "2": // APPLIED
                setInterested(prevInterested => [newTask, ...prevInterested]);
                break;
            case "3": // ROUNDS/INTERVIEWS
                setInterview(prevInterview => [newTask, ...prevInterview]);
                break;
            case "4": // FINAL
                setFinal(prevFinal => [newTask, ...prevFinal]);
                break;
            default:
                break;
        }
    
 console.log("Hello we are here in button click");
 console.log("Pls luck be on my side")
 const combinData = { ...newTask, board_id: BoardId };
 console.log(combinData)

        //Storing a new Application called untitled in the database
        try {
            const response = await fetch("/api/JobAppSteps/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}` // Include user token in the header
                },
                
                body: JSON.stringify(combinData) // Convert newTask to JSON string
            });
            if (response.ok) {
                console.log("Task added successfully so gud");
            }
    
            if (!response.ok) {
                throw new Error("Failed to add new task");
            }
          
        } catch (error) {
            console.log("ERROR LAND")
            console.error("Error adding new task:", error);
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
                    <TaskList
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        isDraggingOver={snapshot.isDraggingOver}
                    >

                        {tasks.map((task, index) => (
                            <Card key={index} index={index} task={task} column={title}/>
                        ))} 


                        {provided.placeholder}
                    </TaskList>
                )}
            </Droppable>
        </Container>
    );

}