import React, { useState, useEffect } from 'react';
import Header from '../../Header/Header';
import './ContactsPage.scss';

const ContactsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    agreement: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await fetch('/api/application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Ошибка при отправке формы' + response.json);
      }
      
      const result = await response.json();
      console.log('Форма отправлена:', result);
      setShowSuccess(true);
      setFormData({
        name: '',
        email: '',
        phoneNumber: '',
        agreement: false
      });
    } catch (err) {
      console.error('Ошибка:', err);
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="contacts-page-wrapper">
      <Header />
      
      <img 
        src="/images/Звезда.png" 
        alt="Декоративная звезда" 
        className="star-decoration" 
      />

      <section className="contacts-page">
        <div className="container">
          <h2 className="section-title">КОНТАКТЫ</h2>
          <p className="contacts-subtitle">
            ОСТАВЬ ЗАЯВКУ, И МЫ С ТОБОЙ СВЯЖЕМСЯ
          </p>
          
          <div className="contacts-container">
            <div className="contacts-form">
              {showSuccess ? (
                <div className="success-message">
                  <h3>Спасибо!</h3>
                  <p>Ваши данные успешно отправлены. Мы свяжемся с вами в ближайшее время.</p>
                  <button 
                    onClick={() => setShowSuccess(false)}
                    className="submit-btn"
                  >
                    Отправить новую заявку
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <img src="/images/Звезда.png" alt="" className="form-star-decoration" loading="lazy" />
                  
                  {error && <div className="error-message">{error}</div>}
                  
                  <div className="form-group">
                    <label htmlFor="name">ФИО</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Почта</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="phone">Номер телефона</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  
                  <div className="checkbox-group">
                    <input 
                      type="checkbox" 
                      id="agreement" 
                      name="agreement"
                      checked={formData.agreement}
                      onChange={handleChange}
                      required 
                    />
                    <label htmlFor="agreement">
                      Я согласна на обработку персональных данных и ознакомлена с политикой конфиденциальности.
                    </label>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Отправка...' : 'Отправить'}
                  </button>
                </form>
              )}
            </div>
            
            <div className="contacts-info">
              <div className="info-item">
                <h3>Адрес</h3>
                <p>г. Санкт-Петербург</p>
              </div>
              
              <div className="info-item">
                <h3>Телефон</h3>
                <p>+7 (911) 543-06-02</p>
                <p>ежедневно с 10:00-19:00</p>
              </div>
              
              <div className="info-item">
                <h3>Почта</h3>
                <p>tranqui.trails.club@mail.ru</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactsPage;