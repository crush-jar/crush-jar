import './Profile.css'
import { useState } from 'react'

type ProfileProps = {
  name: string;
}

function Profile(props: ProfileProps) {
  const [mentions, setMentions] = useState(0)

  return (
    <div className='profile'>
      <button className='button' onClick={() => setMentions(mentions + 1)}>Mention crush</button>
      {props.name}
      <span className='number-of-mentions'> {mentions} </span>
    </div>
  )
}

export default Profile;
