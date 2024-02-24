import './Profile.css';
import { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import { Col, Container, Row } from "react-bootstrap";
import Heart from 'react-heart';

type ProfileProps = {
  name: string;
}

function Profile(props: ProfileProps) {
  const [loading, setLoading] = useState(true)
  const [mentions, setMentions] = useState(0)

  const url = process.env.REACT_APP_MONGO_URL

  async function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json().then(res => res.access_token); // parses JSON response into native JavaScript objects
  }
  const getMentions = async () => {
    const response = await fetch(`${process.env.REACT_APP_MONGO_ENDPOINT_URL}?name=${props.name}`,
      {headers: new Headers({'Authorization': `Bearer ${await postData(url, {key: process.env.REACT_APP_MONGO_KEY})}`})})
    const initialMentions = await response.json()
    setMentions(initialMentions.numMentions)
    setLoading(false)
  }

  const addMention = async () => {
    axios({
      method: 'put',
      url: `${process.env.REACT_APP_MONGO_ENDPOINT_URL}?name=${props.name}&numMentions=${mentions + 1}`,
      headers: {Authorization: `Bearer ${await postData(url, {key: process.env.REACT_APP_MONGO_KEY})}`},
      data: {}
    })
  }

  useEffect(() => {
    getMentions()
  }, [])

  const handleButtonPress = () => {
    addMention()
    setMentions(mentions + 1)
  }

  return (
    <div className="profile mt-5 text-center">
        <Container>
          <Row>
            <Col>
              <Heart animationScale="1.5" activeColor="#FF3D41" className="button" isActive={true} onClick={handleButtonPress}/>
            </Col>
            <Col>
              <span>{props.name}</span>
            </Col>
            <Col>
              <span className='number-of-mentions col'> {loading ? 'loading...' : `$${mentions}.00`} </span>
            </Col>
          </Row>
        </Container>
      </div>
  )
}

export default Profile;
