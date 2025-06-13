import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import EventsPage from './components/pages/EventsPage/EventsPage';
import AboutSection from './components/AboutSection/AboutSection';
import EventsSection from './components/EventsSection/EventsSection';
import WhyJoinSection from './components/WhyJoinSection/WhyJoinSection';
import TelegramOffer from './components/TelegramOffer/TelegramOffer';
import MarketSection from './components/MarketSection/MarketSection';
import ReviewsSection from './components/ReviewsSection/ReviewsSection';
import ContactFormSection from './components/ContactFormSection/ContactFormSection';
import './App.css';

export default function App() {
  const [cookiesAccepted, setCookiesAccepted] = useState(
    localStorage.getItem('cookiesAccepted') === 'true'
  );

  const handleAcceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setCookiesAccepted(true);
  };

  return (
    <Router>
      <div className="app">
        <Header />

        <main>
          {/* Hero Section */}
          {/* TODO пойдет только на главную страницу!!! */}
          {/* <section className="hero">
            <div className="container">
              <h2>Клуб спокойных троп</h2>
              <p>уникальное пространство для женщин</p>
            </div>
          </section> */}

          <Routes>
            {/* <Route path="/" element={<HomePage />} /> */}
            <Route path="/events" element={<EventsPage />} />
            {/* <Route path="/about" element={<AboutPage />} />
            <Route path="/market" element={<MarketPage />} />
            <Route path="/contacts" element={<ContactsPage />} /> */}
          </Routes>

          {/* About Us Section */}
          <AboutSection />

          {/* Events Section */}
          <EventsSection />

          {/* Why Join Section */}
          <WhyJoinSection />

          {/* Telegram Offer */}
          <TelegramOffer />

          {/* Market Section */}
          <MarketSection />

          {/* Reviews Section */}
          <ReviewsSection />

          {/* Contact Form */}
          <ContactFormSection />
        </main>

        <Footer />

        {/* Cookies Notice */}
        {!cookiesAccepted && (
          <div className="cookies-notice show">
            <div className="cookies-container">
              <div className="cookies-text">
                <p>Мы используем файлы cookie для улучшения работы сайта. Оставаясь на сайте, вы соглашаетесь с <a href="/police">Политикой конфиденциальности</a>.</p>
              </div>
              <button className="cookies-button" onClick={handleAcceptCookies}>
                Принять
              </button>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}