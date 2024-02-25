import './Jar.css'

type JarProps = {
  totalAmount: number;
  jar: string;
}

function Jar(props: JarProps) {
  return (
    <header>
      <div>
        <div className='head-text'>
          <img className='head-image' alt="loading" src={props.jar}/>
          <p className='text-on-image'>{`$${props.totalAmount}`}</p>
          </div>
      </div>
    </header>
  )
}

export default Jar;
