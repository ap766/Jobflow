import React from 'react';

const Home = () => {
  return (
    <div className="Homedisplay">
      <span>Hello!</span>
      <span className="h11">
        <img className="girl" src={require('./gl.png')} alt="Girl happy while working on laptop" />
      </span>
    </div>
  );
};

export default Home;
