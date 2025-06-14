import React from 'react';
import CustomAboutSection from './CustomAboutSection'; // Новый компонент для страницы "О нас"
import ReviewsSection from '../../ReviewsSection/ReviewsSection';


export default function AboutPage() {
  return (
    <div className="about-page">
      <CustomAboutSection />
      <ReviewsSection />
    </div>
  );
};