import './Profile.css';
import { useState } from 'react';
import axios from 'axios';
import { Col, Container, Row } from "react-bootstrap";
import { IconButton } from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import Heart from 'react-heart';

type ProfileProps = {
  name: string;
  mentions: number;
  updateTotalMentions: Function;
}

function Profile(props: ProfileProps) {
  const [mentions, setMentions] = useState(props.mentions)
  const getBearerTokenEndpoint = process.env.REACT_APP_MONGO_URL

  async function callPostApi(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST", 
      mode: "cors", 
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data),
    });
    return response.json().then(res => res.access_token); 
  }

  const incrementNumMentions = async (e: number) => {
    axios({
      method: 'put',
      url: `${process.env.REACT_APP_MONGO_ENDPOINT_URL}?name=${props.name}&numMentions=${mentions + e}`,
      headers: {Authorization: `Bearer ${await callPostApi(getBearerTokenEndpoint, {key: process.env.REACT_APP_MONGO_KEY})}`},
      data: {}
    })
  }

  const handleButtonPress = (e: number) => {
    incrementNumMentions(e)
    setMentions(mentions + e)
    props.updateTotalMentions(e)
  }

  const theme = createTheme({
    palette: {primary:{main:'#bdfffe'}}
  });

  return (
    <div className="profile mt-3 mb-4 text-center">
        <Container>
          <Row>
            <Col>
              <div>
                <Heart animationScale="1.5" activeColor="#FF3D41" className="button" isActive={true} onClick={() => handleButtonPress(1)}/>
                <span> </span>
                <ThemeProvider theme={theme}>
                  <IconButton color="primary" onClick={() => handleButtonPress(-1)}>
                    <UndoIcon fontSize="large"/>
                  </IconButton>
                </ThemeProvider>
              </div>
            </Col>
            <Col>
              <span>{props.name}</span>
            </Col>
            <Col>
              <span className='number-of-mentions col'> {`$${mentions}`} </span>
            </Col>
          </Row>
        </Container>
      </div>
  )
}

export default Profile;
