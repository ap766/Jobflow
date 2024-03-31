import React, { useState } from "react";
import Popup from "reactjs-popup";
import styled from "styled-components";
import TaskContext from "../context/TaskContext";

const EditBox = styled.div`
    padding: 8px;
    border-radius: 8px;
    background-color: #ffffff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export default function TaskPopup({ isOpen, task, column }) {
    console.log("TASK POP")
    const { completed, setCompleted, incomplete, setIncomplete, backlog, setBacklog, inReview, setInReview } = React.useContext(TaskContext);
    const [editedTitle, setEditedTitle] = useState(task.title);
    const [editedDetails, setEditedDetails] = useState(task.details);

    const handleSave = () => {
        console.log("Saving...")
        // Determine the column of the edited task
        // Update the state based on the column
        switch (column) {
            case "INTERESTED":
                setCompleted((prevCompleted) => [
                    ...prevCompleted.map((item) =>
                        item.id === task.id ? { ...item, title: editedTitle, details: editedDetails } : item
                    )
                ]);
                break;
            case "APPLIED":
                setIncomplete((prevIncomplete) => [
                    ...prevIncomplete.map((item) =>
                        item.id === task.id ? { ...item, title: editedTitle, details: editedDetails } : item
                    )
                ]);
                break;
            case "ROUNDS/INTERVIEWS":
                setBacklog((prevBacklog) => [
                    ...prevBacklog.map((item) =>
                        item.id === task.id ? { ...item, title: editedTitle, details: editedDetails } : item
                    )
                ]);
                break;
            case "HEARDBACK":
                setInReview((prevInReview) => [
                    ...prevInReview.map((item) =>
                        item.id === task.id ? { ...item, title: editedTitle, details: editedDetails } : item
                    )
                ]);
                break;
            default:
                break;
        }
    };

    return (
        <Popup open={isOpen} modal>
            <EditBox>
                <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    autoFocus
                />
                <textarea
                    value={editedDetails}
                    onChange={(e) => setEditedDetails(e.target.value)}
                    placeholder="Enter details..."
                />
                <button onClick={handleSave}>Save</button>
            </EditBox>
        </Popup>
    );
}