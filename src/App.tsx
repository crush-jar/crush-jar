import React from 'react';
import logo from './logo.svg';
import './App.css';
import money from './images/money.jpg'
import Profile from './components/Profile'

function App() {
  return (
    <div className="App">
      <Profile name='Christina'/>
      <Profile name='Anna'/>
      <Profile name='Daphne'/>
      <Profile name='Emmy'/>
      <img src={money}/>
    </div>
  );
}

export default App;
