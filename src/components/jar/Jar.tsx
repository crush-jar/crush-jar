import money from './images/money.png'
import './Jar.css'

type JarProps = {
  totalAmount: number;
}

function Jar(props: JarProps) {
  return (
    <header>
      <div>
        <div className='head-text'>
          <img className='head-image' src={money}/>
          <p className='text-on-image'>{`$${props.totalAmount}.00`}</p>
          </div>
      </div>
    </header>
  )
}

export default Jar;
