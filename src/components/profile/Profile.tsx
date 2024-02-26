import './Profile.css';
import { useState } from 'react';
import axios from 'axios';
import { Col, Container, Row } from "react-bootstrap";
import { IconButton } from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { callPostApi } from '../../pages/Functions'
import Heart from 'react-heart';

type ProfileProps = {
  name: string;
  mentions: number;
  updateTotalMentions: Function;
}

function Profile(props: ProfileProps) {
  const [mentions, setMentions] = useState(props.mentions)
  const getBearerTokenEndpoint = process.env.REACT_APP_MONGO_URL

  const incrementNumMentions = async (e: number) => {
    axios({
      method: 'put',
      url: `${process.env.REACT_APP_MONGO_ENDPOINT_URL}/mentions?name=${props.name}&numMentions=${mentions + e}`,
      headers: {Authorization: `Bearer ${await callPostApi(getBearerTokenEndpoint, {key: process.env.REACT_APP_MONGO_KEY})}`},
      data: {}
    })
  }

  const addTimestamp = async () => {
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_MONGO_ENDPOINT_URL}/audit?name=${props.name}&numMentions=${mentions + 1}`,
      headers: {Authorization: `Bearer ${await callPostApi(getBearerTokenEndpoint, {key: process.env.REACT_APP_MONGO_KEY})}`},
      data: {}
    })
  }

  const removeTimestamp = async () => {
    axios({
      method: 'delete',
      url: `${process.env.REACT_APP_MONGO_ENDPOINT_URL}/audit?LogId=${props.name}${mentions}`,
      headers: {Authorization: `Bearer ${await callPostApi(getBearerTokenEndpoint, {key: process.env.REACT_APP_MONGO_KEY})}`},
      data: {}
    })
  }

  const handleButtonPress = (e: number) => {
    if (e > 0)
      addTimestamp()
    else 
      removeTimestamp()
    incrementNumMentions(e)
    setMentions(mentions + e)
    props.updateTotalMentions(e)
  }

  const theme = createTheme({
    palette: {primary:{main:'#bdfffe'}},
  });

  return (
    <div className="profile">
        <Container>
          <Row>
            <Col style={{alignSelf: 'center'}}>
              <div>
                <Heart animationScale="1.5" activeColor="#FF3D41" className="button" isActive={true} onClick={() => handleButtonPress(1)}/>
                <span> </span>
                <ThemeProvider theme={theme}>
                  <IconButton color="primary" disabled={mentions === 0} onClick={() => handleButtonPress(-1)}>
                    <UndoIcon sx={{fontSize: '3vh'}} />
                  </IconButton>
                </ThemeProvider>
              </div>
            </Col>
            <Col style={{alignSelf: 'center'}}>
              <div>{props.name}</div>
            </Col>
            <Col style={{alignSelf: 'center'}}>
              <span className=''> {`$${mentions}`} </span>
            </Col>
          </Row>
        </Container>
      </div>
  )
}

export default Profile;
