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
          throw new Error('Ошибка при отправке формы');
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
      <section className="contact-form">
        <div className="container">
          <h2 className="section-title">ОСТАВЬ ЗАЯВКУ, И МЫ С ТОБОЙ СВЯЖЕМСЯ</h2>
          
          <div className="contacts-container">
            {/* *** ИЗМЕНЕНИЕ 1: Звездочка вне формы, но внутри contacts-container или contacts-form *** */}
            {/* Я помещу её прямо перед contacts-form, чтобы она была поверх */}
            <img src="/images/Звезда.png" alt="" className="star-decoration-contact" loading="lazy" /> 

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
                  {/* <img src="/images/Звезда.png" alt="" className="star-decoration" loading="lazy" />  *** УДАЛЕНО: Звезда была здесь *** */}
                  
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