import { useState } from 'react';

export default function EventsSection() {
    const events = [
      {
        id: 1,
        image: "/images/Свеча.jpg",
        title: "Мастер-класс по свечеварению",
        price: "3 000 ₽"
      },
      {
        id: 2,
        image: "/images/Ретрит.jpg",
        title: "Ретрит в Великий Новгород",
        price: "13 000 ₽"
      },
      {
        id: 3,
        image: "/images/Кензан.jpg",
        title: "Мастер-класс по флористике",
        price: "5 000 ₽"
      }
    ];
  
    return (
      <section className="events">
        <div className="container">
          <h2 className="section-title">АФИША МЕРОПРИЯТИЙ</h2>
          
          <div className="event-cards">
            {events.map(event => (
              <div className="event-card" key={event.id}>
                <div className="event-image">
                  <img src={event.image} alt={event.title} loading="lazy" />
                </div>
                <div className="event-info">
                  <div className="event-price">{event.price}</div>
                  <h3 className="event-title">{event.title}</h3>
                  <button className="event-button">Забронировать</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }