import React from 'react';
import logo from './logo.svg';
import money from './images/money.png'
import Profile from './components/Profile'
import './App.css';
import './scss/custom.scss';

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
