import './Profile.css'

type ProfileProps = {
  name: string;
}

function Profile(props: ProfileProps) {

  return (
    <div className='profile'>
      <div>
        <button>Insert Heart</button>
        <span> </span>
        {props.name}
        <span className='number-of-mentions'> 5 </span>
      </div>
      <hr/>
    </div>
  )
}

export default Profile;
