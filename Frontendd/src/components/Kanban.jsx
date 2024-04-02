
//set brds as it is global state variable
//SETLATEST BOARD (ALSO ACTIVATE THAT IN BOARDSJS)
//CLICK ON AGAIN GET BUT THE ID OF THE LATEST ONE 

import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import TaskContext from "../context/TaskContext";
import Column from "./Column";
import { useAuthContext } from "../hooks/useAuthContext";
import {useBrdsContext } from "../hooks/useBrdsContext";




export default function Kanban() {
      const { brds } = useBrdsContext(); 
      const { user } = useAuthContext();

    const { completed, setCompleted, incomplete, setIncomplete, backlog, setBacklog, inReview, setInReview } = React.useContext(TaskContext);

    useEffect(() => {
        const fetchData = async () => {
            console.log("Fetching data...");
            try {
                const response = await fetch("api/JobAppSteps/", {
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
                // Filter the JSON data based on a particular value in a column
                    let interested = json.filter((task) => task.section == "INTERESTED");
            let applied = json.filter((task) => task.section == "APPLIED");
            let rounds = json.filter((task) => task.section == "ROUNDS/INTERVIEWS");
            let heardBack = json.filter((task) => task.section =="HEARDBACK");
            // Set the filtered data to state
            setIncomplete(interested);
            setCompleted(applied);
            setBacklog(rounds);
            setInReview(heardBack);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchData(); // Call the async function
    }, [user.token, setIncomplete, setCompleted, setBacklog, setInReview]);
    

    useEffect(() => {
        console.log('Updated Completed:', completed);
    }, [completed]); // Run this effect whenever 'completed' state changes

    const handleDragEnd = (result) => {
        // Your existing handleDragEnd function

        const { destination, source, draggableId } = result;

        if (!destination || source.droppableId === destination.droppableId) return;
        
        deletePreviousState(source.droppableId, draggableId);
        
        const task = findItemById(draggableId, [...incomplete, ...completed, ...inReview, ...backlog]);
        
        setNewState(destination.droppableId, task);
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
    
    function setNewState(destinationDroppableId, task) {
        let updatedTask;
        switch (destinationDroppableId) {
            case "1":   // TO DO
                updatedTask = { ...task, completed: false };
                setIncomplete(prevIncomplete => [updatedTask, ...prevIncomplete]);
                break;
            case "2":  // DONE
                updatedTask = { ...task, completed: true };
                setCompleted(prevCompleted => [updatedTask, ...prevCompleted]);
                break;
            case "3":  // IN REVIEW
                updatedTask = { ...task, completed: false };
                setInReview(prevInReview => [updatedTask, ...prevInReview]);
                break;
            case "4":  // BACKLOG
                updatedTask = { ...task, completed: false };
                setBacklog(prevBacklog => [updatedTask, ...prevBacklog]);
                break;
        }
    }
    
    function findItemById(id, array) {
        return array.find((item) => item.id == id);
    }

    function removeItemById(id, array) {
        return array.filter((item) => item.id != id);
    }

    return (
        <div style={{ display: "flex" }}>
            <DragDropContext onDragEnd={handleDragEnd}>
                <div>
                <h2 style={{ textAlign: "center" }}>PROGRESS BOARD</h2>
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
