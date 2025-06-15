import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './EventCard.scss';

export default function EventCard({ event }) {
  const navigate = useNavigate();


  const handleEventClick = () => {
    // Сохраняем только минимально необходимые данные в sessionStorage.
    // Это важно, если страница деталей мероприятия (EventDetailsPage)
    // полагается на эти данные из sessionStorage вместо фетчинга по ID.
    const minimalEventData = {
      id: event.id,
      name: event.name,
      cost: event.cost,
      imageUrl: event.imageUrl,
      freeSlots: event.freeSlots
      // Добавьте сюда любые другие поля, которые нужны для EventDetailsPage
    };
    
    try {
      sessionStorage.setItem('selectedEvent', JSON.stringify(minimalEventData));
      navigate(`/events/${event.id}`); // Переходим на страницу деталей
    } catch (err) {
      console.error('Storage error:', err);
      // Если не удалось сохранить, все равно переходим на страницу
      navigate(`/events/${event.id}`);
    }
  };

  if (!event) {
    return null; // Или можно вернуть пустую заглушку, если event по какой-то причине null/undefined
  }

  return (
    <div className="event-card" key={event.id}>
      <div 
        className="event-image-link"
        onClick={handleEventClick} // Теперь клик обрабатывается здесь
      >
        <div className="event-image">
          <img 
            src={event.imageUrl} 
            alt={event.name} 
            loading="lazy"
            onError={(e) => {
              e.target.src = './assets/images/default-event.jpg'; // Заглушка при ошибке
            }}
          />
        </div>
      </div>
      <div className="event-info">
        <div className="event-price">{event.cost} ₽</div> {/* Отображение цены */}
        <h4 className="event-title">
          <div onClick={handleEventClick}>{event.name}</div> {/* Клик по названию */}
        </h4>
        <div 
          className="event-button"
          onClick={handleEventClick} // Клик по кнопке
        >
          {event.freeSlots === 0 ? 'Мест нет' : 'Забронировать'} {/* Статус бронирования */}
        </div>
      </div>
    </div>
  );
}