import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Header from '../../Header/Header';
import EventCard from '../../EventCard/EventCard';
 // Убедитесь, что этот импорт есть

const BookingForm = ({ event, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    slots: 1
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          eventId: event.id
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ошибка бронирования');
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="success-message">
        <button className="close-modal-btn" onClick={onClose}>&times;</button> {/* Крестик для закрытия */}
        <h3>Бронирование успешно!</h3>
        <p>Мы отправили подтверждение на вашу почту</p>
        <button className="close-btn" onClick={onClose}>Закрыть</button>
      </div>
    );
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <button className="close-modal-btn" onClick={onClose}>&times;</button> {/* Крестик для закрытия */}
      <h2 class="section-title">Бронирование мероприятия</h2> {/* Изменен заголовок */}

      <div className="form-group">
        <label htmlFor="fullName">ФИО:</label>
        <input
          type="text"
          id="fullName" // Добавлен id
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email" // Добавлен id
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="phoneNumber">Телефон:</label>
        <input
          type="tel"
          id="phoneNumber" // Добавлен id
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="slots">Количество мест:</label>
        <input
          type="number"
          id="slots" // Добавлен id
          name="slots"
          min="1"
          max="5"
          value={formData.slots}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group total-cost"> {/* Добавлен класс для стилизации */}
        <label>Сумма к оплате: <span className="cost-value">{event.cost * formData.slots} ₽</span></label>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="form-actions">
        {/* Кнопка "Отмена" удалена, вместо нее крестик */}
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Отправка...' : 'Подтвердить бронирование'}
        </button>
      </div>
    </form>
  );
};

export default function EventDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        if (location.state?.event) {
          setEvent(location.state.event);
          setLoading(false);
          return;
        }

        const response = await fetch('/api/events');

        if (!response.ok) {
          throw new Error('Не удалось загрузить мероприятия');
        }

        const data = await response.json();

        if (data.success) {
          setEvents(data.data || []);

          const foundEvent = data.data.find(e => e.id === id);
          if (foundEvent) {
            setEvent(foundEvent);
          } else {
            throw new Error('Мероприятие не найдено');
          }
        } else {
          throw new Error(data.error || 'Ошибка загрузки мероприятий');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [id, location.state]);

  const recommendedEvents = events
    .filter(e => e.id !== id)
    .slice(0, 3);

  if (loading) {
    return <div className="loading">Загрузка...</div>;
  }

  if (error) {
    return <div className="error">Ошибка: {error}</div>;
  }

  if (!event) {
    return <div className="not-found">Мероприятие не найдено</div>;
  }
  console.log('Current event:', event);
  
  return (
    <div className="event-detail-page">
      <Header />

      <main className="container">
        <section className="event-content">
          <div className="event-image">
            <img
              src={event.imageUrl}
              alt={event.name}
              onError={(e) => {
                e.target.src = '/images/default-event.jpg';
              }}
            />
          </div>

          <div className="event-info">
            <h1>{event.name}</h1>
            <div className="event-meta">
              <span className="date">
                {new Date(event.dateTime).toLocaleDateString('ru-RU', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
              <span className="location"> {/* Убедитесь, что .location остался, если он есть в данных */}
                {event.location}
              </span>
            </div>

            <div className="event-price">{event.cost} ₽</div>

            <div className="event-description">
              <p>{event.description}</p>
            </div>

            <button
              className="book-button"
              onClick={() => setShowModal(true)}
              disabled={event.freeSlots === 0}
            >
              {event.freeSlots === 0 ? 'Мест нет' : 'Забронировать'}
            </button>
          </div>
        </section>

        {recommendedEvents.length > 0 && (
          <section className="recommended-events">
            <h2 className="section-title">Рекомендуем также</h2>
            <div className="events-grid">
              {recommendedEvents.map(item => (
                <EventCard key={item.id} event={item} />
              ))}
            </div>
          </section>
        )}
      </main>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <BookingForm event={event} onClose={() => setShowModal(false)} />
          </div>
        </div>
      )}

    </div>
  );
}