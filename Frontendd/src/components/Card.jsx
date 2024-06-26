//DELETE
//A particular card using card id


import React, { useState,useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import JobContext from "../context/JobContext";
import styled from "styled-components";
import { DeleteOutlined } from "@ant-design/icons"; // Importing the delete icon from Ant Design
import CardPopup from "./CardPopup";
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


//If the component is being dragged (props.isDragging is true), the function returns "lightgreen".
//If the component is draggable (props.isDraggable is true), the function returns "lightblue". Otherwise, it returns white.
function bgcolorChange(props) {
  return props.isDragging
    ? "lightgreen"
    : props.isDraggable
    ? "lightblue"
    : "white";
}

export default function Card({ card, index, column }) {

  //User property extracted from the object(value provided by AuthContext.Provider) which currents current state of the authentication context and a dispatch function to update that state
  const {user} = useAuthContext()

  const [isEditing, setIsEditing] = useState(false);

  //interested,applied,interview,final are the states that are used to store the data fetched from the backend and they are global
  const { setInterested, setApplied, setInterview , setFinal} = React.useContext(JobContext);

    // Reset isEditing state whenever card changes.
    useEffect(() => {
      setIsEditing(false);
    }, [card]);

    //The functions here are handleClose,OpenCard,handleDelete
  
  //This function is sent as a prop to the CardPopup Component
  const handleClose = () => {
    setIsEditing(false);
  };


  //To open the CardPopup
  const OpenCard = () => {
    setIsEditing(true);
  };


  const handleDelete = async () => {
    // Implement delete functionality here
    switch (column) {
      case "INTERESTED":
        setInterested((prevComplete) => prevComplete.filter((item) => item.id !== card.id));
        break;
      case "APPLIED":
        setApplied((prevApplied) => prevApplied.filter((item) => item.id !== card.id));
        break;
      case "ROUNDS/INTERVIEWS":
        setInterview((prevReview) => prevReview.filter((item) => item.id !== card.id));
        break;
      case "FINAL":
        setFinal((prevFinal) =>prevFinal.filter((item) => item.id !== card.id));
        break;
      default:
        break;
    }
  
    
    try {
      const response = await fetch(`https://jobflow-bo2c.onrender.com/api/JobAppSteps/${card.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}` // Include user token in the header
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete card");
      }
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };
  

  return (
    <>
      <Draggable draggableId={`${card.id}`} key={card.id} index={index}>
        {(provided, snapshot) => (
          <>
            <Container
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              isDragging={snapshot.isDragging}
              onDoubleClick={OpenCard}
            >
              <div style={{ display: "flex", justifyContent: "start", padding: 2 }}>
                <span>
                  <small>
                    {"  "}
                  </small>
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "center", padding: 2 }}>
                <TextContent>{card.title}</TextContent>
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
        <CardPopup
         ID={card.id}
          isOpen={isEditing}
          card={card}
          column={column}
          onClose={handleClose}//Passing the function here so that when close is click isediting can get set to false
        />
      )}
    </>
  );
}
