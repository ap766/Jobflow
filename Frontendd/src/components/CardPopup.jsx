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


const AddDateButton = styled.button`
    padding: 10px 20px; /* Increased padding */
    border: none;
    border-radius: 6px;
    background-color: #007bff; /* Changed background color */
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 10px;
    &:hover {
        background-color: #0056b3; /* Darker shade on hover */
    }
`;

const SaveButton = styled.button`
    padding: 12px 24px; /* Increased padding */
    border: none;
    border-radius: 6px;
    background-color: #28a745; /* Green color for save button */
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 10px;
    &:hover {
        background-color: #218838; /* Darker shade on hover */
    }
`;


export default function CardPopup({ ID, isOpen, task, column,onClose}) {
    console.log(task)
    const {user} = useAuthContext()
    // const [final, setFinal] = useState(task.title === "FINAL" ? task.additionalField : '');
    const [dates, setDates] = useState(task.dates ? task.dates : []);
    const [startDate, setStartDate] = useState(new Date());  
    const { interested, setInterested, applied, setApplied,interview, setInterview,final, setFinal} = React.useContext(JobContext);
    const [editedTitle, setEditedTitle] = useState(task.title);
    const [editedDetails, setEditedDetails] = useState(task.description);
    const [editedLink, setEditedLink] = useState(task.joblink);
    const [dateNotes, setDateNotes] = useState(task.dateNotes ? task.dateNotes : []);
    
    useEffect(() => {
        if (isOpen && task) {
            console.log("jobbblink")
            console.log(task)
            setEditedTitle(task.title);
            setEditedDetails(task.description);
            setEditedLink(task.joblink);
            setDates(task.roundtiming);
            setDateNotes(task.roundinfo);
        }
    }, [isOpen, task]);

    

    const handleSave = async () => {
        // Determine the column of the edited task
        // Update the state based on the column
        
        let updatedTask;
        switch (column) {

            case "INTERESTED":
                await setApplied((prevApplied) => {
                    updatedTask = { ...task, title: editedTitle, description: editedDetails, joblink: editedLink, roundtiming: dates, roundinfo: dateNotes };
                    return prevApplied.map((item) =>
                        item.id === task.id ? updatedTask : item

                  
                    );
                
                });
                break;
            case "APPLIED":
                await setInterested((prevComplete) => {
                    updatedTask = { ...task, title: editedTitle, description: editedDetails, joblink: editedLink, roundtiming: dates, roundinfo: dateNotes };
                    return prevComplete.map((item) =>
                        item.id === task.id ? updatedTask : item
                    );
                });
                break;
            case "ROUNDS/INTERVIEWS":
                await setInterview((prevInterview) => {
                    updatedTask = { ...task, title: editedTitle, description: editedDetails, joblink: editedLink, roundtiming: dates,roundinfo: dateNotes };
                    return prevInterview.map((item) =>
                        item.id === task.id ? updatedTask : item
                    );
                });
                break;
            case "FINAL":
               
                await  setFinal((prevFinal) => {
                    updatedTask = { ...task, title: editedTitle, description: editedDetails, joblink: editedLink, roundtiming: dates, roundinfo: dateNotes };
                    return prevFinal.map((item) =>
                        item.id === task.id ? updatedTask : item
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
            console.log("Updating task...");
            const response = await fetch(`/api/JobAppSteps/${ID}`, {
                method: 'PATCH', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ title: editedTitle, description: editedDetails, section: column, id: ID, roundtiming: istDates, roundinfo: dateNotes, joblink: editedLink })
            });
    
            if (!response.ok) {
                throw new Error('Failed to update task');
            }

            console.log("Task updated successfully.");
    
            //Update the task object with the new values, to make the frontend more 
            task.title = editedTitle;
            task.description = editedDetails;
            task.joblink = editedLink;
            task.roundtiming = dates;
            task.roundinfo = dateNotes;
            task.roundtiming = istDates;
            task.roundinfo = dateNotes;

        } catch (error) {
            console.error('Error updating task:', error);
        }
    
        console.log("Save operation completed.");
    };
    
    //This is to add dates 
    const handleAddDate = () => {
        //if there are existing ones
        if (dates ) {
            setDates([...dates, new Date()]);
            setDateNotes([...dateNotes, ""]);
        }
        //if none exist from before
        else{
            setDates([new Date()]);
            setDateNotes([""]);
        }
    };

    const handleDateChange = (index, date) => {
        console.log("In date change")
        console.log(typeof date); // Add this line
        console.log(date)
        const newDates = [...dates];
        newDates[index] = date;
        setDates(newDates);
    };

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
                <button onClick={handleAddDate}>+</button>
                <button onClick={handleSave}>Save</button>
                {console.log("tASKSSS")}
                {console.log(task)}
                {console.log(applied)}
                {console.log(final)}
                {console.log(interview)}
            </EditBox>
            )}
        </Popup>
    );
}
