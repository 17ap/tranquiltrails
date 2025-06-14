import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './components/pages/HomePage/HomePage';
import EventsPage from './components/pages/EventsPage/EventsPage';
import AboutPage from './components/pages/AboutPage/AboutPage';
import MarketPage from './components/pages/MarketPage/MarketPage';
import ContactsPage from './components/pages/ContactsPage/ContactsPage';
import EventDetailPage from './components/pages/EventDetailPage/EventDetailPage';
// import BookingSuccessPage from './components/pages/BookingSuccessPage/BookingSuccessPage';
import PrivacyPolicyPage from './components/pages/PrivacyPolicyPage/PrivacyPolicyPage';
import OfferAgreementPage from './components/pages/OfferAgreementPage/OfferAgreementPage';
import MarketDetailPage from './components/pages/MarketDetailPage/MarketDetailPage';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
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
      <ScrollToTop />
      <div className="app">
        <Header />

        <main>
          <Routes>
            {/* Главная страница */}
            <Route path="/" element={<HomePage />} />

            {/* Страница всех мероприятий */}
            <Route path="/events" element={<EventsPage />} />

            {/* Страница конкретного мероприятия */}
            <Route path="/events/:id" element={<EventDetailPage />} />

            {/* Страница "О нас" */}
            <Route path="/about" element={<AboutPage />} />

            {/* Страница магазина */}
            <Route path="/market" element={<MarketPage />} />
            <Route path="/product/:id" element={<MarketDetailPage />} />

            {/* Страница контактов */}
            <Route path="/contacts" element={<ContactsPage />} />

            <Route path="/policy" element={<PrivacyPolicyPage />} />

            <Route path="/offer" element={<OfferAgreementPage />} />

          </Routes>
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