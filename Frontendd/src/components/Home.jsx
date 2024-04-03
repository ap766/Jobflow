import React from 'react';
import "./contact.css"

const Home = () => {
  return (
    <div className="homeDisplay">
      <div className="contentContainer">
        <span className="girlContainer">
          <img className="girl" src={require('./gl.png')} alt="Girl happy while working on laptop" />
        </span>
        <span className="textContainer">
          <p>Hey there, job seekers!</p>
          <p>JobFlow is here to turn your job search into a joy ride.</p>
          <p>Say farewell to the mundane and hello to the magnificent!</p>
        </span>
      </div>
      <div className="rightImageContainer">
        <p className="righttext">Keep Track of your  Job/Internship Applications through a Kanban Board:</p>
        <img className="rightImage" src={require('./sample.png')} alt="Girl happy while working on laptop" />
      </div>
    </div>
  );
};

export default Home;
