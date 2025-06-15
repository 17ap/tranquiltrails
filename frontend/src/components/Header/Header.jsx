import { useState, useEffect } from 'react';
import './Header.scss';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Close mobile menu when clicking on a link
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="logo">
          <img 
            src="../../assets/images/Logotype.png" 
            alt="Клуб спокойных троп" 
            loading="lazy"
          />
        </div>

        <button 
          className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Меню"
          aria-expanded={isMobileMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav 
          className={`menu ${isMobileMenuOpen ? 'active' : ''}`}
          aria-hidden={!isMobileMenuOpen}
        >
          <ul>
            {[
              { path: '/', text: 'главная' },
              { path: '/events', text: 'афиша' },
              { path: '/about', text: 'о нас' },
              { path: '/market', text: 'маркет' },
              { path: '/contacts', text: 'контакты' }
            ].map((item) => (
              <li key={item.path}>
                <a 
                  href={item.path} 
                  onClick={closeMobileMenu}
                  className={location.pathname === item.path ? 'active' : ''}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}