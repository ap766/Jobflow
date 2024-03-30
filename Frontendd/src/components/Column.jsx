import React from "react";
import styled from "styled-components";
import Task from "./Task";
import "./scroll.css";
import TaskContext from "../context/TaskContext";
import { Droppable } from "react-beautiful-dnd";

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
    const { completed,setCompleted,incomplete,setIncomplete,backlog,setBacklog,inReview,setInReview } = React.useContext(TaskContext);
    console.log("these are the tasks")
    console.log(tasks)
    console.log(title)
    const handleAddButtonClick = () => {
        // Create a new task object with a unique ID and default title
        const newTask = {
            id: tasks.length + 1, // Assuming IDs are incremental
            title: "Untitled",
            completed: false, // Assuming default is incomplete
        };
    
        // Depending on the column's ID, update the corresponding state
        switch (id) {
            case "1": // INTERESTED
                setIncomplete(prevIncomplete => [newTask, ...prevIncomplete]);
                break;
            case "2": // APPLIED
                setCompleted(prevCompleted => [newTask, ...prevCompleted]);
                break;
            case "3": // ROUNDS/INTERVIEWS
                setInReview(prevInReview => [newTask, ...prevInReview]);
                break;
            case "4": // HEARDBACK
                setBacklog(prevBacklog => [newTask, ...prevBacklog]);
                break;
            default:
                break;
        }
    };
    


    return (
        <Container className="column">
            <Title
                style={{
                    backgroundColor: "lightblue",
                    position: "sticky",
                    top: "0",
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
                            <Task key={index} index={index} task={task} />
                        ))} 


                        {provided.placeholder}
                    </TaskList>
                )}
            </Droppable>
        </Container>
    );

}