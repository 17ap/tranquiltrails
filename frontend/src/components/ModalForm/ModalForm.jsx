import { useState } from 'react';
import { useParams } from 'react-router-dom';
import './EventDetailPage.scss';

export default function EventDetailPage() {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: ''
  });

  // Здесь будет запрос на получение данных о конкретном событии по id
  const event = {
    id: id,
    name: "Название события",
    cost: 1000,
    // ... другие данные
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Логика отправки формы бронирования
  };

  return (
    <div className="event-detail-page">
      {/* Детальная информация о событии */}
      
      <button 
        className="book-button"
        onClick={() => setIsModalOpen(true)}
      >
        Забронировать
      </button>

      {/* Модальное окно бронирования */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-modal" onClick={() => setIsModalOpen(false)}>&times;</span>
            <div className="booking-container">
              <h2>Бронирование: {event.name}</h2>
              <form className="booking-form" onSubmit={handleSubmit}>
                {/* Поля формы */}
                <button type="submit">Отправить заявку</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}