import React from 'react';
import Profile from './components/profile/Profile'
import './App.css';
import './scss/custom.scss';
import { QueryClient, QueryClientProvider } from 'react-query';

function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Profile name='Christina'/>
        <Profile name='Daphne'/>
        <Profile name='Anna'/>
        <Profile name='Emmy'/>
      </div>
    </QueryClientProvider>
  );
}

export default App;
