import React from 'react';
import joinImage1 from '../../../../public/images/Счастье.jpg';
import joinImage2 from '../../../../public/images/Женщины.jpg';
import joinImage3 from '../../../../public/images/Студия.jpg';
import './CustomAboutSection.scss'; 
import { useNavigate } from 'react-router-dom';


export default function CustomAboutSection() {
  const navigate = useNavigate();

  const handleJoinClick = () => {
    console.log('Attempting navigation...'); 
    navigate('/contacts'); 
  };

  return (
    <section className="custom-about-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">О НАС</h2>
  
        </div>
        
       
     
        <div className="about-block reverse"> 
          <div className="about-text">
            <p>В нашем клубе мы объединяем духовные практики, искусство общения и самовыражения, а также ценности поддержки и взаимопомощи. Мы верим, что сила женщины раскрывается через её связь с природой, внутреннюю мудрость и общение с другими женщинами, которые вдохновляют и поддерживают.</p>
          </div>
          <div className="about-image">
            <img src={joinImage1} alt="Счастье в гармонии" loading="lazy" />
          </div>
        </div>
        

        <div className="about-block "> 
          <div className="about-text">
            <p>«Клуб спокойных троп» — это уникальное пространство, созданное для женщин, которые стремятся к глубокому самопознанию, гармонии с собой и окружающим миром. Здесь мы стремимся не просто развивать внешние качества, но и создавать пространство для истинной гармонии.</p>
          </div>
          <div className="about-image">
            <img src={joinImage2} alt="Женское сообщество" loading="lazy" />
          </div>
        </div>
        

        <div className="about-block reverse"> 
          <div className="about-text">
            <p>Мы создали место, где каждая женщина может найти свой путь к балансу между телом, душой и сообществом. Позволяя каждой участнице раскрыться в её уникальности, найти поддержку и понимание, а также обогатить свою жизнь новыми знаниями и опытом.</p>
          </div>
          <div className="about-image">
            <img src={joinImage3} alt="Наша студия" loading="lazy" />
          </div>
        </div>
        
         <div className="center-button">
          <button 
            className="join-button" 
            onClick={handleJoinClick} 
          >
            Присоединиться
          </button>
        </div>
      </div>
    </section>
  );
};