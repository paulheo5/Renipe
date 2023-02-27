import React, { useState } from 'react';
import '../components/App.css';
import { Button } from './Button';
import './HeroSection.css';
import { useNavigate } from 'react-router-dom';

function HeroSection() {
    //const [show, setShow] = useState(false)
    const searchBox = document.querySelector(".search-box");
    const navigate = useNavigate();

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
          onClick={()=> navigate('/AddMeal')}
        >
          Track a meal
        </Button>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={() => navigate('/SearchRecipe')}
        >
          Start cooking <i className='far fa-play-circle' />
              </Button>
        
          </div>
       
    </div>
  );
}

export default HeroSection;
