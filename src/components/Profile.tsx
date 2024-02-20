import './Profile.css'
import { useState } from 'react'

type ProfileProps = {
  name: string;
}

function Profile(props: ProfileProps) {
  const [mentions, setMentions] = useState(0)

  return (
    <div className='profile'>
      <div>
        <button onClick={() => setMentions(mentions + 1)}>Mention crush</button>
        <span> </span>
        {props.name}
        <span className='number-of-mentions'> {mentions} </span>
      </div>
      <hr/>
    </div>
  )
}

export default Profile;
