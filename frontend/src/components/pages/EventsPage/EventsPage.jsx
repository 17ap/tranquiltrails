import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom'; // useNavigate больше не нужен здесь
import Header from '../../Header/Header';
import EventCard from '../../EventCard/EventCard'; // Импортируем наш обновленный EventCard


export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // const eventsPerRow = 3; // Эту логику убираем, так как EventsGrid будет справляться со строками
  // const rows = []; // Это тоже убираем
  // const handleEventClick = ... // Эта функция теперь внутри EventCard

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success) {
          const simplifiedEvents = (data.data || []).map(event => ({
            id: event.id,
            name: event.name,
            cost: event.cost,
            imageUrl: event.imageUrl,
            freeSlots: event.freeSlots
            // Убедитесь, что EventCard использует именно эти поля
          }));
          
          setEvents(simplifiedEvents);
          
          // Логика sessionStorage для списка мероприятий (events) теперь не нужна для EventCard.
          // Если она используется где-то ещё, можно оставить. В данном случае, я её оставляю
          // как часть исходного кода, но учтите, что для EventCard она не критична.
          try {
            sessionStorage.removeItem('events');
            sessionStorage.setItem('events', JSON.stringify(simplifiedEvents));
          } catch (storageErr) {
            console.error('Storage save error:', storageErr);
          }
        } else {
          throw new Error(data.error || 'Failed to fetch events');
        }
      } catch (err) {
        console.error('Fetch events error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <div className="loading">Загрузка мероприятий...</div>;
  if (error) return <div className="error">Ошибка: {error}</div>;
  if (events.length === 0) return <div>Нет доступных мероприятий</div>;

  return (
    <div className="events-page">
      <Header activeLink="afisha" />
      
      <section className="events-section">
        <div className="container">
          <h3 className="events-h3">Мероприятия</h3>
          
          <div className="events-grid">
            {/* Теперь просто маппим события и рендерим EventCard для каждого */}
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
            {/* Удаляем логику с events-row и пустыми карточками, 
                потому что EventCard теперь самодостаточен,
                а сетка управляется через .events-grid CSS. */}
          </div>
          
          <div className="telegram-plate">
            <div className="offer-content">
              <div className="offer-text">
                <h3>При подписке<br />на telegram-канал<br /><span>скидка 10%</span></h3>
              </div>
              <div className="offer-image">
                <img src="../../../assets/images/Girlss.jpg" alt="Девушки из сообщества" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>
     
    </div>
  );
}