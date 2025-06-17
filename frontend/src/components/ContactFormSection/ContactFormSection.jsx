import { useState } from 'react';


export default function ContactFormSection() {
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
          throw new Error('Ошибка при отправке формы: ' + await response.text()); // Изменено для лучшей диагностики
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
      <section className="contact-form-section"> {/* Изменил класс для ясности */}
        <div className="container">
          <h2 className="section-title">ОСТАВЬ ЗАЯВКУ, И МЫ С ТОБОЙ СВЯЖЕМСЯ</h2>
          
          <div className="main-contact-content"> {/* Новый контейнер для центрирования формы и звезды */}
            {/* Звездочка вне формы, но внутри контейнера, который мы будем центрировать */}
            <img src="/images/Звезда.png" alt="" className="star-decoration" loading="lazy" />

            <div className="contacts-form-wrapper"> {/* Обертка для самой формы, чтобы её можно было легко центрировать */}
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
          </div>
        </div>
      </section>
    );
}