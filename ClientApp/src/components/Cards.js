import React from 'react';
import './Cards.css';
import CardItem from '../components/CardItem';
//import UserData from './components/UserData';
function Cards() {
  return (
    <div className='cards'>
      <h1>Check out these Recipes!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/img-9.jpg'
              text='Avocado Tomato & Mozzarella Panini/sandwiches'
              label='Avocado'
              path='/services'
            />
            <CardItem
              src='images/img-2.jpg'
              text='Vanilla Panna Cotta with Chocolate Ganache'
              label='Milk'
              path='/services'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/img-3.jpg'
              text='Easy Chicken Pot Pie'
              label='Chicken'
              path='/services'
            />
            <CardItem
              src='images/img-4.jpg'
              text='Scotch Eggs'
              label='Eggs'
              path='/products'
            />
            <CardItem
              src='images/img-8.jpg'
              text="Bird's Nest Marinara"
              label='Pasta'
              path='/sign-up'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
