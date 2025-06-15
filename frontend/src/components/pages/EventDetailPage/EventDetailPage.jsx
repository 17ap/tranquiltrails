import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Header from '../../Header/Header';
import './EventDetailPage.scss';

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
        <h3>Бронирование успешно!</h3>
        <p>Мы отправили подтверждение на вашу почту</p>
        <button className="close-btn" onClick={onClose}>Закрыть</button>
      </div>
    );
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <h2>Бронирование: {event.name}</h2>

      <div className="form-group">
        <label>ФИО:</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Телефон:</label>
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Количество мест:</label>
        <input
          type="number"
          name="slots"
          min="1"
          max={event.freeSlots}
          value={formData.slots}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Сумма к оплате: {event.cost * formData.slots} ₽</label>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="form-actions">
        <button type="button" className="cancel-btn" onClick={onClose}>
          Отмена
        </button>
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
        // Проверяем, есть ли событие в состоянии location
        if (location.state?.event) {
          setEvent(location.state.event);
          setLoading(false);
          return;
        }

        // Загружаем все события
        const response = await fetch('/api/events');

        if (!response.ok) {
          throw new Error('Не удалось загрузить мероприятия');
        }

        const data = await response.json();

        if (data.success) {
          setEvents(data.data || []);

          // Находим нужное событие по ID
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

  // Рекомендуемые мероприятия (исключая текущее)
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
                e.target.src = './assets/images/default-event.jpg';
              }}
            />
          </div>

          <div className="event-info">
            <h1>{event.name}</h1>
            <div className="event-meta">
              <span className="date">
                {new Date(event.dateTime).toLocaleDateString('ru-RU')}
              </span>
              <span className="location">{event.location}</span>
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
            <h2>Рекомендуем также</h2>
            <div className="events-grid">
              {recommendedEvents.map(item => (
                <div
                  key={item.id}
                  className="event-card"
                  onClick={() => navigate(`/events/${item.id}`, { state: { event: item } })}
                >
                  <div className="event-image">
                    <img src={item.imageUrl} alt={item.name} />
                  </div>
                  <div className="event-details">
                    <h3>{item.name}</h3>
                    <div className="event-price">{item.cost} ₽</div>
                  </div>
                </div>
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