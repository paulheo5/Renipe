import React from 'react';
import './Cards.css';
import CardItem from '../components/CardItem';
function Cards() {
  return (
    <div className='cards'>
      <h1 className='header2'>Check out these Recipes!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
             <CardItem id= '633167'
              src='images/avocado.jpg'
              text='Avocado Tomato & Mozzarella Panini/sandwiches'
              label='Avocado'
              path='/services'
            />
              <CardItem id= '664327'
              src='images/milk.jpg'
              text='Vanilla Panna Cotta with Chocolate Ganache'
              label='Milk'
              path='/services'
            />
          </ul>
          <ul className='cards__items'>
              <CardItem id='641901'
              src='images/chicken.jpg'
              text='Easy Chicken Pot Pie'
              label='Chicken'
              path='/services'
            />
              <CardItem id='659581'
              src='images/eggs.jpg'
              text='Scotch Eggs'
              label='Eggs'
              path='/products'
            />
              <CardItem id='634995'
              src='images/pasta.jpg'
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
