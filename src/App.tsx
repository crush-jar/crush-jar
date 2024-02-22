import React from 'react';
import Profile from './components/profile/Profile'
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
