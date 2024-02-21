import './Profile.css'
import { useState } from 'react'
import { Button, Col, Container, Row } from "react-bootstrap";

type ProfileProps = {
  name: string;
}

function Profile(props: ProfileProps) {
  const [mentions, setMentions] = useState(0)

  return (
    <div className="profile mt-5 text-center">
      <Container>
        <Row>
          <Col>
            <Button variant='primary' className='button col' onClick={() => setMentions(mentions + 1)}>Mention crush</Button>
          </Col>
          <Col>
            <span>{props.name}</span>
          </Col>
          <Col>
            <span className='number-of-mentions col'> {mentions} </span>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Profile;
