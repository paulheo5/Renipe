import React, { useState } from 'react';
import '../components/App.css';
import { Button } from './Button';
import './HeroSection.css';

function HeroSection() {
    const [show, setShow] = useState(false)
  return (
      <div className='hero-container'>
          

      <h1>RENIPE</h1>
      <p>Track your meal and recipe</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          onClick={()=> setShow(!show)}
        >
          Track a meal
        </Button>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={() => setShow(!show)}
        >
          Start cooking <i className='far fa-play-circle' />
              </Button>
        
          </div>
          <div>{
              show ? <p><input placeholder="Enter:" /></p> : null
                }
          </div>
    </div>
  );
}

export default HeroSection;
