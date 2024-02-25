import './Profile.css';
import { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import { Col, Container, Row } from "react-bootstrap";
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

  const addMention = async () => {
    axios({
      method: 'put',
      url: `${process.env.REACT_APP_MONGO_ENDPOINT_URL}?name=${props.name}&numMentions=${mentions + 1}`,
      headers: {Authorization: `Bearer ${await callPostApi(getBearerTokenEndpoint, {key: process.env.REACT_APP_MONGO_KEY})}`},
      data: {}
    })
  }

  const handleButtonPress = () => {
    addMention()
    setMentions(mentions + 1)
    props.updateTotalMentions()
  }

  return (
    <div className="profile mt-3 mb-4 text-center">
        <Container>
          <Row>
            <Col>
              <Heart animationScale="1.5" activeColor="#FF3D41" className="button" isActive={true} onClick={handleButtonPress}/>
            </Col>
            <Col>
              <span>{props.name}</span>
            </Col>
            <Col>
              <span className='number-of-mentions col'> {`$${mentions}.00`} </span>
            </Col>
          </Row>
        </Container>
      </div>
  )
}

export default Profile;
