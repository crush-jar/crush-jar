import './Profile.css'
import { useState, useEffect } from 'react'
import { Col, Container, Row } from "react-bootstrap";
import Heart from 'react-heart';

type ProfileProps = {
  name: string;
}

function Profile(props: ProfileProps) {
  const [data, setData] = useState("");
  const getData = async () => {
    const resp = await fetch('https://api.sampleapis.com/coffee/hot');
    const json = await resp.json();
    console.log(json)
    setData(json);
  }

  useEffect(() => {
    getData();
  }, []);

  const [mentions, setMentions] = useState(0)
  console.log(data)

  return (
    <div className="profile mt-5 text-center">
      <Container>
        <Row>
          <Col>
            <Heart animationScale="1.5" activeColor="#DDBE80" className="button" isActive={true} onClick={() => setMentions(mentions + 1)}/>
          </Col>
          <Col>
            <span>{props.name}</span>
          </Col>
          <Col>
            <span className='number-of-mentions col'> {`$${mentions}.00`} </span>
          </Col>
          <Col>
            <div>
              {JSON.stringify(data, null, 2)}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Profile;
