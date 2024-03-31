// import React, { useState, useEffect } from "react";
// import { DragDropContext } from "react-beautiful-dnd";
// import TaskContext from "../context/TaskContext";


// import Column from "./Column";

// export default function Kanban() {

//     const { completed,setCompleted,incomplete,setIncomplete,backlog,setBacklog,inReview,setInReview } = React.useContext(TaskContext);

  

//     useEffect(() => {
//         console.log("Fetching data...");
//         fetch("https://jsonplaceholder.typicode.com/todos")
//             .then((response) => response.json())
//             .then((json) => {
//                 const completedTasks = json.filter((task) => task.completed);
//                 const incompleteTasks = json.filter((task) => !task.completed);
//                 console.log("Completed Tasks:", completedTasks);
//                 console.log("Incomplete Tasks:", incompleteTasks);
//                 // setCompleted("hey");
//                 // setIncomplete("bye");
//                 setCompleted([
//                     { id: 1, title: 'Task 1', completed: true },
//                     { id: 2, title: 'Task 2', completed: true },
//                     // Add more tasks as needed
//                   ]);

//                 console.log(completed)
//                 console.log(incomplete)
//             })
//             .catch((error) => {
//                 console.error("Error fetching data:", error);
//             });
//     }, []);

//     useEffect(() => {
//         console.log('Updated Completed plssssssss:', completed);
//       }, [completed]); // Only re-run the effect if 'completed' state changes
    

//     const handleDragEnd = (result) => {
//         const { destination, source, draggableId } = result;

//         if (!destination || source.droppableId === destination.droppableId) return;

//         deletePreviousState(source.droppableId, draggableId);

//         const task = findItemById(draggableId, [...incomplete, ...completed, ...inReview, ...backlog]);

//         setNewState(destination.droppableId, task);

//     };

//     function deletePreviousState(sourceDroppableId, taskId) {
//         switch (sourceDroppableId) {
//             case "1":
//                 setIncomplete(removeItemById(taskId, incomplete));
//                 break;
//             case "2":
//                 setCompleted(removeItemById(taskId, completed));
//                 break;
//             case "3":
//                 setInReview(removeItemById(taskId, inReview));
//                 break;
//             case "4":
//                 setBacklog(removeItemById(taskId, backlog));
//                 break;
//         }

//     }
//     function setNewState(destinationDroppableId, task) {
//         let updatedTask;
//         switch (destinationDroppableId) {
//             case "1":   // TO DO
//                 updatedTask = { ...task, completed: false };
//                 setIncomplete([updatedTask, ...incomplete]);

//                 break;
//             case "2":  // DONE
//                 updatedTask = { ...task, completed: true };
//                 setCompleted([updatedTask, ...completed]);
//                 break;
//             case "3":  // IN REVIEW
//                 updatedTask = { ...task, completed: false };
//                 setInReview([updatedTask, ...inReview]);
//                 break;
//             case "4":  // BACKLOG
//                 updatedTask = { ...task, completed: false };
//                 setBacklog([updatedTask, ...backlog]);
//                 break;


//         }
//     }
//     function findItemById(id, array) {
//         return array.find((item) => item.id == id);
//     }

//     function removeItemById(id, array) {
//         return array.filter((item) => item.id != id);
//     }

//     return (
//         <DragDropContext onDragEnd={handleDragEnd}>
//             <h2 style={{ textAlign: "center" }}>PROGRESS BOARD</h2>

//             <div
//                 style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     flexDirection: "row",
//                     width: "1300px",
//                     margin: "0 auto"
//                 }}
//             >
//                 <Column title={"INTERESTED"} tasks={incomplete} id={"1"} />
//                 <Column title={"APPLIED"} tasks={completed} id={"2"} />
//                 <Column title={"ROUNDS/INTERVIEWS"} tasks={inReview} id={"3"} />
//                 <Column title={"HEARDBACK"} tasks={backlog} id={"4"} />
//             </div>
//         </DragDropContext>
//     );
// }

import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import TaskContext from "../context/TaskContext";
import Column from "./Column";
import Sidebar from "./Sidebar";

export default function Combined() {
    const { completed, setCompleted, incomplete, setIncomplete, backlog, setBacklog, inReview, setInReview } = React.useContext(TaskContext);
    
    useEffect(() => {
        const fetchData = async () => {
            console.log("Fetching data...");
            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/todos");
                const json = await response.json();
                const completedTasks = json.filter((task) => task.completed);
                const incompleteTasks = json.filter((task) => !task.completed);
                console.log("Completed Tasks:", completedTasks);
                console.log("Incomplete Tasks:", incompleteTasks);
                setCompleted(completedTasks);
                setIncomplete(incompleteTasks);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData(); // Call the async function
    }, []);

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
            <Sidebar  />
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
