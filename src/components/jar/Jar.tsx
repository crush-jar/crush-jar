import money from './images/money.png'
import './Jar.css'

function Jar() {
  return (
    <header>
      <div>
        <div className='head-text'>
          <div className='head-image'>
            <img src={money}/>
          </div>
          <p className='text-on-image'>test</p>
          </div>
      </div>
    </header>
  )
}

export default Jar;
