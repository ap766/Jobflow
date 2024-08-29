# Jobflow

Jobflow is a project designed to streamline and enhance the job application process, inspired by personal experiences in tracking my internship applications. Traditional tools like Spreadsheets and Notepads were not to my liking since they lack the visual representation and intuitive workflow management.

Spreadsheets have a tabular format which is cumbersome for tracking multiple applications, while Notepad lacks organizational structure. Jobflow's Kanban board simplifies tracking with drag-and-drop functionality, allowing users to move applications across stages like "interested," "applied," "rounds/interviews," and "heard back."

Customizable boards cater to users' specific needs, whether for internships, jobs, or other opportunities. There is no limit to the number of boards - whether you are using it for a Winter Internship or to Apply for a job next summer. Users can also manage comprehensive details within the platform, including job titles, descriptions, links, and scheduling for rounds.

Moreover, Jobflow integrates desktop notifications for scheduled rounds to ensure users stay informed. Built with the MERN Stack, Jobflow combines modern web technologies' flexibility with intuitive visual task management. With Jobflow, the job search process becomes efficient and enjoyable, empowering users to stay organized and focused on their career goals.
With this application, users can easily organize and track their job applications, ensuring a streamlined and efficient job search process.

## Tech Stack
+ Frontend - Reactjs,HTML,CSS
+ Backend - Nodejs,Expressjs,Mongodb
## Features
### 1) Home Page
It contains the information about the application
![image](https://github.com/ap766/Jobflow/assets/79255079/c1ff5145-67d4-4198-9666-ae0911f71554)
### 2) User registration and login
Registeration and Login using password which is hashed using bcrypt library and stored in the database
![image](https://github.com/ap766/Jobflow/assets/79255079/2adaef3e-1bf4-497a-a07d-42f3fe41faab)
### 3) Kanban Board to track overall application progress
Created using react-beautiful-dnd you can move your application to the respective column based on its status
![image](https://github.com/ap766/Jobflow/assets/79255079/9b5ae87a-a5bb-497d-bb1b-aa57949d1da6)
### 4) Add new Board for your Job/Internship Search! - Double Click to open other boards
Create a new board when you begin your search .Double click and view your previous boards.
![image](https://github.com/ap766/Jobflow/assets/79255079/5e875cf6-5e9e-48c0-8352-bfc4a13b34cd)
### 5) Add new job/internship applications with details ,link. - Use + button to add and double click to edit the details
Click the + button to add a new job to the respective column and furthur edit it by double clicking on it 
![image](https://github.com/ap766/Jobflow/assets/79255079/79119779-0f10-4453-9ca2-be5e375671d5)
### 6) Set reminders for important dates and times
Use the calender to remember important dates and times
![image](https://github.com/ap766/Jobflow/assets/79255079/3b3e4699-c15b-4f86-9c52-9f5b5996370b)
### 7) Update application status by dragging it to the Applied,Rounds/Interviews,Final columns
Move it to be the respective column
![image](https://github.com/ap766/Jobflow/assets/79255079/be918d12-4c27-4203-ac40-8567eb35ebf0)
### 8) Set Desktop Notifications so you dont miss any round! Also add notes - mentioning what it is along with the actual scheduled time
Click on the button at the top right if you wish to recieve notificatons for that particular board
![image](https://github.com/ap766/Jobflow/assets/79255079/287f3b53-de88-45ca-a022-a6b5f3a9b359)
### 9) Edit or delete boards,applications

## Deleted one job
Click on delete option
![image](https://github.com/ap766/Jobflow/assets/79255079/25af3bbc-2062-42e5-b2d6-44d859cc8db7)
## Editing Board Title - Single Click to Edit Board!
![image](https://github.com/ap766/Jobflow/assets/79255079/e84fb895-4521-4f93-b922-a74c681a7c1b)


## Working on
+ Search and filter applications
+ Using this application through Telegram
  
## Future
+ Project can be furthur enhanced by helping users with their resumes by having a resume creator
+ Using NLP to analyse how sutiable the resume is for the JD
+ Web Scrapping for finding relevant jobs as per our interest
+ Filling all details necessary for job which can be entered in any online job application using the Chrome Extension
+ Bot on the website to help with general advise related to jobs/internships
+ Maybe Admin posting jobs manually or through some other means?

# How to run 
## To run Backend
Navigate to the project directory:

`cd backend`

Install dependencies using npm:

`npm install`

To start the Dimensioning Backend in development mode, execute the following command:

`npm run dev`

## To run Frontend
Navigate to the project directory:

`cd Frontendd`

Install dependencies using npm:

`npm install`

To start the Frontend:

`npm run start`

# Design
## Use Case Diagram
![image](https://github.com/user-attachments/assets/efcf51d2-64ef-471a-aaa5-686830a92811)

## Architectural Design 
MVC Architecture Followed
+ Model
   + Encapsulates the Application State
   + Business Logic - Because it defines the rules for how the data can be stored , modified , created
   + Database - Structure Defined
   + From Controller - CRUD Operations are performed by interacting with it
   + From View - Notifies Updates (NS)
+ Controller
   + Maps User Actions to model updates
   + Selects Views - Indirectly
   + HTTP request processing
   + Application Specific Logic
   + Data Validation
+ View
   + Renders Model
   + Sends User Events to the controller
   + Requests Model Updates
   + Dynamic Page Generation 
   + Form Management
  

    
