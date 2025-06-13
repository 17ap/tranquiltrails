import { useState } from 'react';

export default function ContactFormSection() {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      agreement: false
    });
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission
      console.log('Form submitted:', formData);
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
            <div className="contacts-form">
              <form onSubmit={handleSubmit}>
                <img src="/images/Звезда.png" alt="" className="star-decoration" loading="lazy" />
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
                    name="phone"
                    value={formData.phone}
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
                
                <button type="submit" className="submit-btn">Отправить</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
  