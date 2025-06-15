import './Footer.scss';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Logo and Details */}
          <div className="footer-column">
            <div className="footer-info">
              <img 
                src="../../../assets/images/logo2.png" 
                alt="Логотип" 
                className="footer-logo"
                loading="lazy"
              />
              <p>ИП ДЕРГУНОВА АЛЕКСАНДРА</p>
              <p>ИНН 4578393948753475934</p>
              <p>ОГРН 4578393948753475934</p>
            </div>
          </div>

          {/* Main Links */}
          <div className="footer-column">
            <h4 className="footer-title">МЕНЮ</h4>
            <ul className="footer-links">
              <li><a href="/">главная</a></li>
              <li><a href="/afisha">афиша</a></li>
              <li><a href="/about">о нас</a></li>
              <li><a href="/market">маркет</a></li>
              <li><a href="/contacts">контакты</a></li>
            </ul>
          </div>

          {/* Information */}
          <div className="footer-column">
            <h4 className="footer-title">ИНФОРМАЦИЯ</h4>
            <ul className="footer-links">
              <li><a href="/offer">Договор публичной оферты</a></li>
              <li><a href="/policy">Политика конфиденциальности</a></li>
              <li>
                <a href="https://t.me/apl17w" target="_blank" rel="noopener noreferrer">
                  Разработка сайта @apl17
                </a>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div className="footer-column">
            <h4 className="footer-title">КОНТАКТЫ</h4>
            <div className="contacts">
              <p>+7 (911) 585-36-35</p>
              <p>Сотрудничество</p>
              <p>г. Санкт-Петербург</p>
            </div>
            <div className="social-icons">
              <a 
                href="https://www.instagram.com/tranquil.trails.club" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <img src="./assets/images/inst.png" alt="Instagram" loading="lazy" />
              </a>
              <a 
                href="https://vk.com/tranquiltrailsclub" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="VK"
              >
                <img src="./assets/images/vk.png" alt="VK" loading="lazy" />
              </a>
              <a 
                href="https://t.me/TranquilTrailsClub" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Telegram"
              >
                <img src="./assets/images/tg2.png" alt="Telegram" loading="lazy" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}