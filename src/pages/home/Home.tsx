import React from 'react';
import Profile from '../../components/profile/Profile'
import Jar from '../../components/jar/Jar'
import '../App.css';
import '../scss/custom.scss';
import money from '../../components/jar/images/money.png'
import { useState, useMemo, useCallback } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

function Home() {
  const queryClient = new QueryClient()
  const [mentions, setMentions] = useState<any[]>([])
  const [audit, setAudit] = useState<any[]>([])
  const [totalMentions, setTotalMentions] = useState(0)
  const [jarLoaded, setJarLoaded] = useState(false)

  async function callPostApi(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST", 
      mode: "cors", 
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data),
    });
    return response.json().then(res => res.access_token); 
  }

  const getMentions = useCallback(async () => {
    const header = new Headers({'Authorization': `Bearer ${await callPostApi(process.env.REACT_APP_MONGO_URL, {key: process.env.REACT_APP_MONGO_KEY})}`})
    const profileCall = await fetch(`${process.env.REACT_APP_MONGO_ENDPOINT_URL}`,{headers: header})
    const auditCall = await fetch(`https://us-east-2.aws.data.mongodb-api.com/app/data-ocdpl/endpoint/audit`,{headers: header})

    const initialMentions = await profileCall.json()
    const initialAuditLog = await auditCall.json()
    const totalInitialMentions: number = initialMentions.reduce((sum: number, mention: any) => sum + mention.numMentions, 0);
    setAudit(initialAuditLog.sort((a: any, b: any) => {return a.timestamp > b.timestamp? -1 : 1}))
    setMentions(initialMentions)
    setTotalMentions(totalInitialMentions)
    console.log(audit)
  }, [])

  const loading = useMemo(() => {
    getMentions()
    return (mentions.length !== 0) && jarLoaded ? false : true
  }, [mentions.length, getMentions, jarLoaded])

  const filterMentionByName = (name: string) => {
    console.log(mentions?.filter((profile) => profile.name === name))
    return mentions?.filter((profile) => profile.name === name)[0]?.numMentions
  }

  if (loading) return (
    <div>
      <img alt="" style={{opacity: 0}} src={money} onLoad={() => setJarLoaded(true)}/>
      <div className="App App-header position-absolute top-50 start-50 translate-middle">
        Loading...
      </div>
    </div>
  )

  return (
    <div className="App">
      <Profile updateTotalMentions={(e: number) => setTotalMentions(totalMentions + e)} mentions={filterMentionByName('Christina')} name='Christina'/>
      <Profile updateTotalMentions={(e: number) => setTotalMentions(totalMentions + e)} mentions={filterMentionByName('Daphne')} name='Daphne'/>
      <Profile updateTotalMentions={(e: number) => setTotalMentions(totalMentions + e)} mentions={filterMentionByName('Anna')} name='Anna'/>
      <Profile updateTotalMentions={(e: number) => setTotalMentions(totalMentions + e)} mentions={filterMentionByName('Emmy')} name='Emmy'/>
      <Jar jar={money} totalAmount={totalMentions}/>
    </div>
  );
}

export default Home;
