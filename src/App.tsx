import React from 'react';
import logo from './logo.svg';
import './App.css';
import money from './images/money.png'
import Profile from './components/Profile'

function App() {
  return (
    <div className="App">
      <Profile name='Christina'/>
      <Profile name='Anna'/>
      <Profile name='Daphne'/>
      <Profile name='Emmy'/>
    </div>
  );
}

export default App;
