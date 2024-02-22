import React from 'react';
import logo from './logo.svg';
import money from './images/money.png'
import Profile from './components/profile/Profile'
import Jar from './components/jar/Jar'
import './App.css';
import './scss/custom.scss';
import MongoDataComponent from './components/mongodb/MongoDataComponent'

function App() {
  return (
    <div className="App">
      <Profile name='Christina'/>
      <Profile name='Anna'/>
      <Profile name='Daphne'/>
      <Profile name='Emmy'/>
      <MongoDataComponent/>
    </div>
  );
}

export default App;
