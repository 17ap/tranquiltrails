// src/components/EventsSection/EventsSection.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EventCard from '../EventCard/EventCard';
import './EventsSection.scss';

export default function EventsSection({ limit = 3 }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        if (!response.ok) throw new Error('Не удалось загрузить мероприятия');
        const data = await response.json();
        setEvents(data.data || []);
      } catch (err) {
        setError(err.message);
        console.error('Ошибка загрузки мероприятий:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <div className="loading">Загрузка мероприятий...</div>;
  if (error) return <div className="error">Ошибка: {error}</div>;
  if (events.length === 0) return <div className="empty">Нет предстоящих мероприятий</div>;

  // Берем только указанное количество событий (по умолчанию 3)
  const displayedEvents = events.slice(0, limit);

  return (
    <section className="events-section">
      <div className="container">
        <h2 className="section-title">АФИША МЕРОПРИЯТИЙ</h2>


        <div className="events-grid">
          {displayedEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
       
      </div>
    </section>
  );
}