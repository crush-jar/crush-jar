import React from 'react';
import Profile from '../../components/profile/Profile'
import Jar from '../../components/jar/Jar'
import '../App.css';
import '../scss/custom.scss';
import './home.css';
import money from '../../components/jar/images/money.png'
import { useState, useMemo, useCallback } from 'react';
import { Link } from "react-router-dom";
import HistoryIcon from '@mui/icons-material/History';
import { Col, Container, Row } from "react-bootstrap";

function Home() {
  const [mentions, setMentions] = useState<any[]>([])
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
    const profileCall = await fetch(`${process.env.REACT_APP_MONGO_ENDPOINT_URL}/mentions`,{headers: header})

    const initialMentions = await profileCall.json()
    const totalInitialMentions: number = initialMentions.reduce((sum: number, mention: any) => sum + mention.numMentions, 0);
    setMentions(initialMentions)
    setTotalMentions(totalInitialMentions)
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
      <Container>
        <Row>
          <Col>
          </Col>
          <Col>
            <Jar jar={money} totalAmount={totalMentions}/>
          </Col>
          <Col className="history-button-container">
            {totalMentions > 0 && <Link to={"audit"}>
              <HistoryIcon sx={{fontSize: '8vh'}} className="history-button"/>
            </Link>}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
