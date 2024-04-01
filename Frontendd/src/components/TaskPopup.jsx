import React, { useState } from "react";
import Popup from "reactjs-popup";
import styled from "styled-components";
import TaskContext from "../context/TaskContext";
import { useAuthContext } from "../hooks/useAuthContext"


const EditBox = styled.div`
    padding: 20px; /* Reduced padding for better layout */
    border-radius: 12px;
    background-color: #ffffff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    position: relative;
    top: 20px;
    display: flex;
    flex-direction: column;
`;

const InputField = styled.input`
    width: 80%;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 6px;
    border: 1px solid #ccc;
`;

const TextAreaField = styled.textarea`
    width: 80%;
    height: 100px;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 6px;
    border: 1px solid #ccc;
    background-color: #f5f5f5; /* Slightly lighter background for textarea */
`;
export default function TaskPopup({ ID,isOpen, task, column }) {
    const {user} = useAuthContext()
    console.log("The id is")
    console.log(ID)
    console.log("TASK POP")
    const { completed, setCompleted, incomplete, setIncomplete, backlog, setBacklog, inReview, setInReview } = React.useContext(TaskContext);
    const [editedTitle, setEditedTitle] = useState(task.title);
    const [editedDetails, setEditedDetails] = useState(task.details);
    const handleSave = async () => {
        console.log("IDDDD")
        console.log(task.id)
        console.log("Saving...");
    
        // Determine the column of the edited task
        // Update the state based on the column
        switch (column) {
            case "INTERESTED":
                await setIncomplete((prevIncomplete) => [
                    ...prevIncomplete.map((item) =>
                        item.id === task.id ? { ...item, title: editedTitle, details: editedDetails} : item
                    )
                ]);
                break;
            case "APPLIED":
                await setCompleted((prevComplete) => [
                    ...prevComplete.map((item) =>
                        item.id === task.id ? { ...item, title: editedTitle, details: editedDetails } : item
                    )
                ]);
                break;
            case "ROUNDS/INTERVIEWS":
                await setBacklog((prevBacklog) => [
                    ...prevBacklog.map((item) =>
                        item.id === task.id ? { ...item, title: editedTitle, details: editedDetails } : item
                    )
                ]);
                break;
            case "HEARDBACK":
                await setInReview((prevInReview) => [
                    ...prevInReview.map((item) =>
                        item.id === task.id ? { ...item, title: editedTitle, details: editedDetails } : item
                    )
                ]);
                break;
            default:
                break;
        }
    
        try {
            const response = await fetch(`/api/JobAppSteps/${task.id}`, {
                method: 'PATCH', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ title: editedTitle, description: editedDetails,section:column,id:ID })
            });
    
            if (!response.ok) {
                throw new Error('Failed to update task');
            }
            
            console.log("Task updated successfully.");
        } catch (error) {
            console.error('Error updating task:', error);
        }
        
        console.log("Save operation completed.");
    };
    
    
    return (
        <Popup open={isOpen} modal>
            <EditBox>
                <InputField
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    autoFocus
                />
                <TextAreaField
                    value={editedDetails}
                    onChange={(e) => setEditedDetails(e.target.value)}
                    placeholder="Enter details..."
                />
                <button onClick={handleSave}>Save</button>
            </EditBox>
        </Popup>
    );
}
