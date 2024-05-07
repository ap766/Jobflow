import React from 'react';
import './styles.css'; // Assuming you have a separate styles file

const Home = () => {
  return (
    <div>
      {/* First part: Image on right, text on left */}
      <div className="first-section">
        <div className="image">
          <img src={require('./gl.png')} alt="Image" style={{ maxWidth: '400px',borderRadius:"50%" }} />
        </div>
        <div className="text">
          <h2>About Jobflow</h2>
          <p style={{ fontSize: '14px' }}>JobFlow is your ultimate companion in the job search journey. With this innovative application, users can effortlessly organize and monitor their job applications, transforming the often stressful process of job hunting into a seamless and efficient experience. Say goodbye to scattered spreadsheets and endless emails – JobFlow centralizes all your job search activities in one user-friendly platform, empowering you to stay focused and productive throughout your job search.</p>
        </div>
      </div>

      {/* Second part: Image on left, text on right */}
      <div className="second-section">
        <div className="image">
          <img src={require('./sample.png')} alt="Image"  style={{ maxWidth: '900px',marginLeft:"170px" }} />
        </div>
        <div className="text">
          <h2>Kanban Board</h2>
          <p style={{ fontSize: '14px' }}>JobFlow boasts a robust set of features designed to streamline every aspect of your job search. From user registration and secure login functionalities to a dynamic Kanban Board interface for tracking application progress, JobFlow leverages cutting-edge technology to optimize your job hunting experience. With intuitive features like reminders for important dates and times, desktop notifications, and the ability to edit or delete boards and applications with ease, JobFlow sets the standard for modern job search management tools.</p>
        </div>
      </div>

      {/* Third part: Centered text with 3 columns */}
      <div className="third-section">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <p style={{ fontSize: '14px' }}>Brace yourself for a job search experience that's as smooth as silk and twice as satisfying</p>
            </div>
            <div className="col-md-4">
              <p style={{ fontSize: '14px' }}>Get ready to conquer the job market like a boss with JobFlow – the ultimate sidekick for every job seeker!"</p>
            </div>
            <div className="col-md-4">
              <p style={{ fontSize: '14px' }}>Who says job hunting can't be fun? With JobFlow, you'll be breezing through applications like a pro and celebrating every milestone along the way. Let the job search adventure begin!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Button section */}
      <div className="button-section">
        <button style={{ fontSize: '14px' }}>Try it Out!</button>
      </div>

     
    </div>
  );
};

export default Home;
