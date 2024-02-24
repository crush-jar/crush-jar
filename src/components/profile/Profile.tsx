import './Profile.css';
import { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import { useQuery, useMutation } from "react-query";
import { Col, Container, Row } from "react-bootstrap";
import Heart from 'react-heart';

type ProfileProps = {
  name: string;
}

function Profile(props: ProfileProps) {
  const [loading, setLoading] = useState(true)
  const [mentions, setMentions] = useState(0)

  const getMentions = async () => {
    const response = await fetch(`https://rich-red-giraffe-cap.cyclic.app/mentions?name=${props.name}`)
    const initialMentions = await response.json()
    setMentions(initialMentions[0].numMentions)
    setLoading(false)
  }

  useEffect(() => {
    getMentions()
  }, [])

  const addMention = useMutation({
    mutationFn: (newComment) => axios.put(`https://rich-red-giraffe-cap.cyclic.app/mentions?name=${props.name}&numMentions=${mentions + 1}`),
  })

  const handleButtonPress = () => {
    addMention.mutate()
    setMentions(mentions + 1)
  }

  return (
    <div className="profile mt-5 text-center">
        <Container>
          <Row>
            <Col>
              <Heart animationScale="1.5" activeColor="#DDBE80" className="button" isActive={true} onClick={handleButtonPress}/>
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
