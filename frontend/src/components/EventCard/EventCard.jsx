import React from 'react';
import { useNavigate } from 'react-router-dom';
import './EventCard.scss';

export default function EventCard({ event }) {
  const navigate = useNavigate();


  const handleEventClick = () => {
    const minimalEventData = {
      id: event.id,
      name: event.name,
      cost: event.cost,
      imageUrl: event.imageUrl,
      freeSlots: event.freeSlots
    };
    
    try {
      sessionStorage.setItem('selectedEvent', JSON.stringify(minimalEventData));
      navigate(`/events/${event.id}`);
    } catch (err) {
      console.error('Storage error:', err);
      navigate(`/events/${event.id}`);
    }
  };

  if (!event) {
    return null;
  }

  return (
    <div className="event-card" key={event.id}>
      <div 
        className="event-image-link"
        onClick={handleEventClick}
      >
        <div className="event-image">
          <img 
            src={event.imageUrl} 
            alt={event.name} 
            loading="lazy"
            onError={(e) => {
              e.target.src = '/images/default-event.jpg';
            }}
          />
        </div>
      </div>
      <div className="event-information">
        <div className="event-price">{event.cost} ₽</div>
        <h4 className="event-title">
          <div onClick={handleEventClick}>{event.name}</div>
        </h4>
        <div 
          className="event-button"
          onClick={handleEventClick}
        >
          {event.freeSlots === 0 ? 'Мест нет' : 'Подробнее'} {/* ИЗМЕНЕНИЕ ЗДЕСЬ */}
        </div>
      </div>
    </div>
  );
}