import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import TaskContext from "../context/TaskContext";
import styled from "styled-components";
import { DeleteOutlined } from "@ant-design/icons"; // Importing the delete icon from Ant Design
import TaskPopup from "./TaskPopup";
import { useAuthContext } from "../hooks/useAuthContext"


const Container = styled.div`
  border-radius: 10px;
  box-shadow: 5px 5px 5px 2px grey;
  padding: 8px;
  color: #000;
  margin-bottom: 8px;
  min-height: 120px;
  margin-left: 10px;
  margin-right: 10px;
  background-color: ${(props) => bgcolorChange(props)};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const TextContent = styled.div``;

const Icons = styled.div`
  display: flex;
  justify-content: end;
  padding: 2px;
`;

function bgcolorChange(props) {
  return props.isDragging
    ? "lightgreen"
    : props.isDraggable
    ? props.isBacklog
    ? "#F2D7D5"
    : "#DCDCDC"
    : props.isBacklog
    ? "#F2D7D5"
    : "#EAF4FC";
}

export default function Task({ task, index, onSave, column }) {
  const {user} = useAuthContext()
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDetails, setEditedDetails] = useState(task.details);
  const { completed, setCompleted, incomplete, setIncomplete, inReview, setInReview ,backlog, setBacklog} = React.useContext(TaskContext);
  const handleDoubleClick = () => {
    setIsEditing(true);
  };
  const handleDelete = async () => {
    // Implement delete functionality here
    switch (column) {
      case "INTERESTED":
        setIncomplete((prevIncomplete) => prevIncomplete.filter((item) => item.id !== task.id));
        break;
      case "APPLIED":
        setCompleted((prevComplete) => prevComplete.filter((item) => item.id !== task.id));
        break;
      case "ROUNDS/INTERVIEWS":
        setInReview((prevReview) => prevReview.filter((item) => item.id !== task.id));
        break;
      case "HEARDBACK":
        setBacklog((prevBacklog) => prevBacklog.filter((item) => item.id !== task.id));
        break;
      default:
        break;
    }
  
    // Call API to delete the task
    try {
      const response = await fetch(`/api/JobAppSteps/${task.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}` // Include user token in the header
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  

  return (
    <>
      <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
        {(provided, snapshot) => (
          <>
            <Container
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              isDragging={snapshot.isDragging}
              onDoubleClick={handleDoubleClick}
            >
              <div style={{ display: "flex", justifyContent: "start", padding: 2 }}>
                <span>
                  <small>
                  
                    {"  "}
                  </small>
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "center", padding: 2 }}>
                <TextContent>{task.title}</TextContent>
              </div>
              <Icons>
                <div>
                <DeleteOutlined onClick={handleDelete} style={{ color: "black", fontSize: "20px", cursor: "pointer" }} />
                </div>
              </Icons>
              {provided.placeholder}
            </Container>
          </>
        )}
      </Draggable>

      {isEditing && (
        <TaskPopup
         ID={task.id}
          isOpen={isEditing}
          task={task}
          column={column}
        />
      )}
    </>
  );
}
