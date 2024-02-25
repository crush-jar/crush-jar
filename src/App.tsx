import React from 'react';
import Profile from './components/profile/Profile'
import './App.css';
import './scss/custom.scss';
import { useState, useEffect, useMemo } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

function App() {
  const queryClient = new QueryClient()
  const bearerTokenEndpoint = process.env.REACT_APP_MONGO_URL
  const [mentions, setMentions] = useState<any[]>([])

  async function callPostApi(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST", 
      mode: "cors", 
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data),
    });
    return response.json().then(res => res.access_token); 
  }

  const getMentions = async () => {
    const response = await fetch(`${process.env.REACT_APP_MONGO_ENDPOINT_URL}`,
      {headers: new Headers({'Authorization': `Bearer ${await callPostApi(bearerTokenEndpoint, {key: process.env.REACT_APP_MONGO_KEY})}`})})
    const initialMentions = await response.json()
    setMentions(initialMentions)
  }

  const loading = useMemo(() => {
    getMentions()
    return mentions.length !== 0 ? false : true
  }, [mentions.length])

  const filterMentionByName = (name: string) => {
    console.log(mentions?.filter((profile) => profile.name === name))
    return mentions?.filter((profile) => profile.name === name)[0]?.numMentions
  }

  if (loading) return (<div className="App App-header">Loading...</div>)

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Profile mentions={filterMentionByName('Christina')} name='Christina'/>
        <Profile mentions={filterMentionByName('Daphne')} name='Daphne'/>
        <Profile mentions={filterMentionByName('Anna')} name='Anna'/>
        <Profile mentions={filterMentionByName('Emmy')} name='Emmy'/>
      </div>
    </QueryClientProvider>
  );
}

export default App;
