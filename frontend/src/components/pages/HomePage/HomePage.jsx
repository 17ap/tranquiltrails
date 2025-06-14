import React from 'react';
import Header from '../../Header/Header';
import HeroSection from '../../HeroSection/HeroSection';
import AboutSection from '../../AboutSection/AboutSection';
import EventsSection from '../../EventsSection/EventsSection';
import WhyJoinSection from '../../WhyJoinSection/WhyJoinSection';
import MarketSection from '../../MarketSection/MarketSection';
import TelegramOffer from '../../TelegramOffer/TelegramOffer';
import ReviewsSection from '../../ReviewsSection/ReviewsSection'; 
import ContactFormSection from '../../ContactFormSection/ContactFormSection';


function HomePage() {
  return (
    <div className="home-page">
      <Header />
      <HeroSection />
      <AboutSection />
      <EventsSection />
      <WhyJoinSection />
      <MarketSection />
      <TelegramOffer />
      <ReviewsSection />
      <ContactFormSection />
   
    </div>
  );
}

export default HomePage;