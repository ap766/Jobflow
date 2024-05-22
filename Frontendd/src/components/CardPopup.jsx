//PATCH
//used to edit the card details and save them in the database
//(once things are changed )
import React, { useState,useEffect} from "react";
import Popup from "reactjs-popup";
import styled from "styled-components";
import JobContext from "../context/JobContext";
import { useAuthContext } from "../hooks/useAuthContext"
import DatePicker from "react-datepicker";  
import "react-datepicker/dist/react-datepicker.css";


const EditBox = styled.div`
    padding: 20px;
    border-radius: 12px;
    background-color: #f0f0f0; /* Changed background color */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Adjusted box shadow */
    position: relative;
    top: 20px;
    display: flex;
    flex-direction: column;
    max-width: 500px; /* Adjusted max-width for better responsiveness */
    margin: auto; /* Centering the box horizontally */
`;

const CloseButton = styled.button`
    position: absolute;
    right: 10px;
    top: 10px;
    background: transparent;
    border: none;
    font-size: 20px;
    cursor: pointer;
`;

const InputField = styled.input`
    width: 100%;
    margin-bottom: 15px; /* Increased margin bottom */
    padding: 12px; /* Increased padding */
    border-radius: 6px;
    border: 1px solid #ccc;
`;

const TextAreaField = styled.textarea`
    width: 100%;
    height: 120px; /* Increased height */
    margin-bottom: 15px; /* Increased margin bottom */
    padding: 12px; /* Increased padding */
    border-radius: 6px;
    border: 1px solid #ccc;
    background-color: #ffffff;
    resize: vertical; /* Allowing vertical resizing */
`;

const DateField = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 15px; /* Increased margin bottom */
`;

const DatePickerWrapper = styled.div`
    margin-right: 10px; /* Add margin between date picker and input field */
`;

const DateNotesInput = styled.input`
    width: 100%;
    padding: 12px; /* Increased padding */
    border-radius: 6px;
    border: 1px solid #ccc;
`;
;

const AddButton = styled.button`
  background-color: #384C5D;
  border: none;
  color: white;
  padding: 10px 32px; /* Adjusted padding */
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  border-radius: 10px; /* Adjust this value as needed */
`;

const SaveButton = styled.button`
  background-color: #384C5D;
  border: none;
  color: white;
  padding: 10px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 10px; /* Adjust this value as needed */
`;


export default function CardPopup({ ID, isOpen, card, column,onClose}) {
    
    //User property extracted from the object(value provided by AuthContext.Provider) which currents current state of the authentication context and a dispatch function to update that state
    const {user} = useAuthContext()

    //interested,applied,interview,final are the states that are used to store the data fetched from the backend and they are global
    const { interested, setInterested, applied, setApplied,interview, setInterview,final, setFinal} = React.useContext(JobContext);

    
    const [dates, setDates] = useState(card.dates ? card.dates : []);  

    const [editedTitle, setEditedTitle] = useState(card.title);

    const [editedDetails, setEditedDetails] = useState(card.description);

    const [editedLink, setEditedLink] = useState(card.joblink);

    const [dateNotes, setDateNotes] = useState(card.dateNotes ? card.dateNotes : []);
    
    
    //So see we are getting the new value of value right from kanban->column->card->and hence since code is changed when this popup is opened it printed all our old changed values(from the global variables indirectly) , so
    //even date and date notes are stored that way but when we want to add a new one , somehow the gobal variables are modified after being fine , so we have to use card.... to change it again cus idk its just changed so 
    //So i observed that editedTitle,etc gets changed right away but somehow dates and datesNotes arent updated like that idk why

    useEffect(() => {

         if (card) {
           setDates(card.roundtiming);
           setDateNotes(card.roundinfo);
        }
    }, [card]);


    //The functions are handleSave,handleAddDate,handleDateChange,handleNoteChange

    const handleSave = async () => {
        
        let updatedCard;
        switch (column) {
            case "INTERESTED":
                await setInterested((prevComplete) => {
                    updatedCard = { ...card, title: editedTitle, description: editedDetails, joblink: editedLink, roundtiming: dates, roundinfo: dateNotes };
                    return prevComplete.map((item) =>
                        item.id === card.id ? updatedCard : item
                    );
                });

                break;

            case "APPLIED":
                await setApplied((prevApplied) => {
                    updatedCard = { ...card, title: editedTitle, description: editedDetails, joblink: editedLink, roundtiming: dates, roundinfo: dateNotes };
                    return prevApplied.map((item) =>
                        item.id === card.id ? updatedCard : item

                    );
                
                });
                break;
            case "ROUNDS/INTERVIEWS":
                await setInterview((prevInterview) => {
                    updatedCard = { ...card, title: editedTitle, description: editedDetails, joblink: editedLink, roundtiming: dates,roundinfo: dateNotes };
                    return prevInterview.map((item) =>
                        item.id === card.id ? updatedCard : item
                    );
                });
                break;
            case "FINAL":
               
                await  setFinal((prevFinal) => {
                    updatedCard = { ...card, title: editedTitle, description: editedDetails, joblink: editedLink, roundtiming: dates, roundinfo: dateNotes };
                    return prevFinal.map((item) =>
                        item.id === card.id ? updatedCard : item
                    );
                });
                break;
            default:
                break;
        }
    

        //to update in database whenever user enters their application details
        try {

            //if dates is defined 
            const istDates = dates && dates.length > 0 ? dates.map(date => new Date(date).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })) : [];
            console.log("Updating card...");
            const response = await fetch(`https://jobflow-bo2c.onrender.com/api/JobAppSteps/${ID}`, {
                method: 'PATCH', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ title: editedTitle, description: editedDetails, section: column, id: ID, roundtiming: istDates, roundinfo: dateNotes, joblink: editedLink })
            });
    
            if (!response.ok) {
                throw new Error('Failed to update card');
            }

            console.log("Card updated successfully.");
              
            /*confirm this not required*/
            // //Update the card object with the new values, to make the frontend more 
            // card.title = editedTitle;
            // card.description = editedDetails;
            // card.joblink = editedLink;
            // card.roundtiming = istDates;
            // card.roundinfo = dateNotes;

        } catch (error) {
            console.error('Error updating card:', error);
        }
    
        console.log("Save operation completed.");
    };
    
    //This is to add dates 
    const handleAddDate = () => {
        //if there are existing ones
        console.log("in that function")
        if (dates) {
            setDates([...dates, new Date()]);
            setDateNotes([...dateNotes, ""])
        }
        //if none exist from before
        else{
            setDates([new Date()]);
            setDateNotes([""]);
        }
        console.log("in handle add dates")
        console.log(dates)
        console.log(dateNotes)
    };

    //The handleDateChange function is used to update a specific date in the dates state
    //It takes an index and a date, creates a new array from the current dates state, 
    //updates the date at the given index, and sets the new array as the new dates state.
    const handleDateChange = (index, date) => {
        const newDates = [...dates];
        newDates[index] = date;
        setDates(newDates);
    };


    //The handleNoteChange function is used to update a specific note in the dateNotes state
    //It works similarly to the handleDateChange function.
    const handleNoteChange = (index, event) => {

        const newNotes = [...dateNotes];
        newNotes[index] = event.target.value;
        setDateNotes(newNotes);
    };
    
    
    return (
        <Popup open={isOpen} modal>
             {(close) => (
            <EditBox>
                <CloseButton onClick={() => {onClose(); close();}}>x</CloseButton>
                Job Title:
                <InputField
                    type="text"
                    value={editedTitle}
                    placeholder="Job Title"
                    onChange={(e) => {
                        setEditedTitle(e.target.value);
                        console.log(editedTitle); // Print the updated value of editedTitle
                    }}                   
                />
                Description:
                <TextAreaField
                    value={editedDetails}
                    placeholder="Details"
                    onChange={(e) => {
                        setEditedDetails(e.target.value);
                        console.log(editedDetails); // Print the updated value of editedTitle
                    }}   
                   
                />
                Link:
                <InputField
                    value={editedLink}
                    placeholder="Job Link"
                    onChange={(e) => setEditedLink(e.target.value)}
                />
                Add Important Dates:
                <div>
                    {/*n the render method, for each date in the dates state, a DateField component is rendered
                . dates state, a DateField component is rendered. This component includes a DatePicker component for
                selecting the date and a DateNotesInput component for entering the note related to the date.*/}
                {dates && dates.map((date, index) => (
    <DateField key={index}>
        <DatePickerWrapper>
            <DatePicker
                selected={dates[index] instanceof Date ? dates[index] : new Date(dates[index])} //this fixed the e.fullyear error
                onChange={(date) => handleDateChange(index, date)}
                showTimeSelect
                dateFormat="MM/dd/yyyy h:mm aa"
            />
        </DatePickerWrapper>
        <DateNotesInput
            value={dateNotes[index]}
            onChange={(e) => handleNoteChange(index, e)}
            placeholder="Date Notes"
        />
    </DateField>
))}
                </div>
                <AddButton onClick={handleAddDate}>+</AddButton>
                <SaveButton onClick={handleSave}>Save</SaveButton>
            </EditBox>
            )}
        </Popup>
    );
}
