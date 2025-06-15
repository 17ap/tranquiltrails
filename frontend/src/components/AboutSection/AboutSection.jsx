// Component for About Section
import { useNavigate } from 'react-router-dom';
import joinImage1 from '../../assets/images/Girl.jpg';
import joinImage2 from '../../assets/images/circle1.png';
import joinImage3 from '../../assets/images/circle2.png';
import joinImage4 from '../../assets/images/circle3.png';

import './AboutSection.scss';


export default function AboutSection() {
  const navigate = useNavigate();

  const handleJoinClick = () => {
    console.log('Attempting navigation...'); // Debug
    navigate('/contacts'); // Переход на страницу контактов
  };

    return (
      <section className="about-us">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">о нас</h2>
          </div>
          
          <div className="about-content">
            <div className="about-text">
              <div className="text-box first-box">
                <p style={{ color: 'white' }}>Мы — женское сообщество, где творчество, вдохновение и поддержка идут рука об руку</p>
              </div>
              <div className="text-box second-box">
                <p style={{ color: 'white' }}>Наша студия — это место, где проходят уникальные мастер-классы, лекции и нетворкинг встречи</p>
              </div>
              <div className="text-box third-box">
                <p>Здесь ты найдешь не только новые знания и навыки, но и вдохновляющее женское сообщество, которое поддерживает и вдохновляет на каждом шаге.</p>
              </div>
            </div>
            
            <div className="about-image">
                 <img src={joinImage1} alt="Девушка" loading="lazy" />
            </div>
          </div>
          
          <div className="center-button">
          <button 
            className="join-button" 
            onClick={handleJoinClick} // Добавляем обработчик клика
          >
            Присоединиться
          </button>
        </div>
          
          <div className="features-container">
            <div className="features">
              <div className="feature-box">
                 <img src={joinImage2} alt="texture" loading="lazy" />
                <h4>СООБЩЕСТВО ЕДИНОМЫШЛЕННИЦ</h4>
              </div>
              <div className="features-line" style={{ width: '455px' }}></div>
              <div className="feature-box">
               <img src={joinImage3} alt="texture" loading="lazy" />
                <h4>ТВОРЧЕСКИЕ МАСТЕР-КЛАССЫ</h4>
              </div>
              <div className="features-line" style={{ width: '455px' }}></div>
              <div className="feature-box">
                <img src={joinImage4} alt="texture" loading="lazy" />
                <h4>ПУТЬ К ГАРМОНИИ</h4>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }