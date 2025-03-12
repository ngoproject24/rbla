import React from 'react';

import { Hero } from '../Components/Hero/Hero';
import { Popular } from '../Components/Popular/Popular';
import Header from '../Components/Header/Header';
import Marquee from './Marquee';
import Footer from '../Components/Footer/Footer';
import Chatbot from '../Components/Chatbot/Chatbot';

export const Home = () => {
  return (
    <>
      <Header />
      <Marquee />
      <Hero />
      <Popular />
      
    </>
  );
};
