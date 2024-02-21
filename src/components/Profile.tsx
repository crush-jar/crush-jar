import './Profile.css'
import { useState } from 'react'
import { Button, Col, Container, Row } from "react-bootstrap";
import Heart from 'react-heart';

type ProfileProps = {
  name: string;
}

function Profile(props: ProfileProps) {
  const [mentions, setMentions] = useState(0)
  const [heartClicked, setHeartClicked] = useState(false)

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
            <span className='number-of-mentions col'> {`\$${mentions}.00`} </span>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Profile;
