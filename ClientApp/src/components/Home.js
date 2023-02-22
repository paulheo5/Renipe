import React, { Component } from 'react';
import Cards from './components/Cards';

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div>
        <h1>Hello, Reniper</h1>
            <Cards />
        </div>
    );
  }
}
//import UserData from './components/UserData';
//import React from 'react';
////import '../../App.css';
//import Cards from './components/Cards';
//import HeroSection from './components/HeroSection';
//import Footer from './components/Footer';

//function Home() {
//    return (
//        <>
//            <HeroSection />
//            <Cards />
//            <Footer />
//        </>
//    );
//}

//export default Home;

