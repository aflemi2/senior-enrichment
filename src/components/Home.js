import React from 'react';

const Home = ()=> {
  return (
    <div style ={{ backgroundColor: 'aliceblue'}} >
      <h2 style ={{ backgroundColor: 'aliceblue'}} className= 'container'> Welcome to Margaret Hamilton Interplanetary Academy of JavaScript. </h2>
      <img src={ '/public/images/homepage.jpg' } width={1000} />
    </div>
  );
};

export default Home;
