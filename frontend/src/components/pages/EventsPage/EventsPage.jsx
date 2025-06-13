import { useState } from 'react';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
// import '../styles/AfishaPage.scss';

export default function EventsPage () {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const events = [
    {
      id: 1,
      image: "/images/Свеча.jpg",
      title: "Мастер-класс по свечеварению",
      price: "3 000 ₽",
      link: "card_candle.html"
    },
    {
      id: 2,
      image: "/images/Ретрит.jpg",
      title: "Ретрит в Великий Новгород",
      price: "13 000 ₽",
      link: "card_retrit.html"
    },
    {
      id: 3,
      image: "/images/Кензан.jpg",
      title: "Мастер-класс по флористике",
      price: "5 000 ₽",
      link: "card_kenzan.html"
    },
    {
      id: 4,
      image: "/images/Браслеты.jpg",
      title: "Мастер-класс: браслеты из камней",
      price: "3 000 ₽",
      link: "card_stone.html"
    },
    {
      id: 5,
      image: "/images/Нумерология.jpg",
      title: "Встреча с экспертом-нумерологом",
      price: "3 000 ₽",
      link: "card_num.html"
    },
    {
      id: 6,
      image: "/images/Нетворкинг.jpg",
      title: "Нетворкинг встреча",
      price: "5 000 ₽",
      link: "card_networking.html"
    },
    {
      id: 7,
      image: "/images/Арт-терапия.jpg",
      title: "Арт-терапия",
      price: "2 500 ₽",
      link: "card_art.html"
    },
    {
      id: 8,
      image: "/images/Лекция.jpg",
      title: "Лекция с психологом",
      price: "3 000 ₽",
      link: "card_psigology.html"
    },
    {
      id: 9,
      image: "/images/Алтай.jpg",
      title: "Ретрит на Алтай",
      price: "90 000 ₽",
      link: "card_altai.html"
    }
  ];

  const handleBookingClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="afisha-page">
      <Header activeLink="afisha" />
      
      <section className="events">
        <div className="container">
          <div className="event-cards">
            {events.map((event) => (
              <div className="event-card" key={event.id}>
                <div className="event-image">
                  <img src={event.image} alt={event.title} loading="lazy" />
                </div>
                <div className="event-info">
                  <div className="event-price">{event.price}</div>
                  <h3 className="event-title">{event.title}</h3>
                  <button 
                    className="event-button"
                    onClick={() => handleBookingClick(event)}
                  >
                    Забронировать
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Telegram offer block */}
          <div className="telegram-plate">
            <div className="container">
              <div className="offer-content">
                <div className="offer-text">
                  <h3>При подписке<br />на telegram-канал<br /><span>скидка 10%</span></h3>
                </div>
                <div className="offer-image">
                  <img src="/images/Девушки.jpg" alt="Девушки из сообщества" loading="lazy" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Booking Modal */}
      {isModalOpen && (
        <div id="booking-modal" className="modal">
          <div className="modal-content">
            <span className="close-modal" onClick={closeModal}>&times;</span>
            <div className="booking-container">
              <h1 className="modal-event-title">{selectedEvent?.title}</h1>
              <form id="booking-form" className="booking-form">
                {/* Add your form fields here */}
                <div className="form-group">
                  <label htmlFor="name">Ваше имя:</label>
                  <input type="text" id="name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input type="email" id="email" required />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Телефон:</label>
                  <input type="tel" id="phone" required />
                </div>
                <button type="submit" className="submit-btn">Отправить заявку</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};