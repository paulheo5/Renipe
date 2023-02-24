import React, { useState } from 'react';
import '../components/App.css';
import { Button } from './Button';
import './HeroSection.css';

function HeroSection() {
    //const [show, setShow] = useState(false)
    const searchBox = document.querySelector(".search-box");

  return (
      <div className='hero-container'>
          
      <video src='/videos/background.mp4' autoPlay loop muted />
      <h1>RENIPE</h1>
      <p>Track your meal and recipe</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          onClick={()=> input}
        >
          Track a meal
        </Button>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          //onClick={() => setShow(!show)}
        >
          Start cooking <i className='far fa-play-circle' />
              </Button>
        
          </div>
          <div className='search-box'>
              <input type= "text" placeholder="Enter..."/>
              
          </div>
    </div>
  );
}

export default HeroSection;
