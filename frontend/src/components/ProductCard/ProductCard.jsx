// src/components/ProductCard/ProductCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.scss'; // Убедитесь, что у вас есть этот файл стилей

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  // Этот обработчик клика будет использоваться для всей карточки
  const handleProductClick = (e) => {
    // Проверяем, был ли клик по кнопке "Написать продавцу", чтобы не вызывать навигацию по продукту
    if (e.target.closest('.seller-contact-button')) {
      return;
    }
    
    if (!product || !product.id) {
      console.warn('Product or product ID is missing for navigation.');
      return;
    }

    try {
      const productData = {
        id: product.id,
        name: product.name,
        imageUrl: product.imageUrl || product.image || '/images/default-product.jpg',
        cost: product.cost || product.price,
        category: product.category,
        description: product.description,
        material: product.material,
        isNew: product.isNew,
        oldPrice: product.oldPrice
      };

      const viewedProducts = JSON.parse(localStorage.getItem('viewed_products') || '[]');
      const updatedHistory = [
        product.id,
        ...viewedProducts.filter(viewedId => viewedId !== product.id)
      ].slice(0, 10);
      
      localStorage.setItem('viewed_products', JSON.stringify(updatedHistory));

      navigate(`/product/${product.id}`, {
        state: { 
          product: productData,
          from: window.location.pathname
        }
      });

    } catch (error) {
      console.error('Navigation error:', error);
      navigate(`/product/${product.id}`);
    }
  };

  // Проверяем, что product существует
  if (!product) {
    return null;
  }

  const imageUrl = product.imageUrl || product.image || '/images/default-product.jpg';
  const displayPrice = product.cost !== undefined ? product.cost : product.price;

  return (
    <div
      className="product-card"
      key={product.id}
      onClick={handleProductClick} // Клик по всей карточке для навигации
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleProductClick(e)}
      aria-label={`Просмотреть детали товара ${product.title || product.name}`}
    >
      <div className="product-image-link"> {/* Аналог event-image-link */}
        <div className="product-image-wrapper"> {/* Аналог event-image */}
          <img
            src={imageUrl}
            alt={product.title || product.name}
            loading="lazy"
            onError={(e) => {
              e.target.src = '/images/default-product.jpg';
              e.target.onError = null;
            }}
          />
          {/* Возможно, badge лучше разместить здесь, если он всегда на изображении */}
          {product.isNew && <span className="product-badge">New</span>}
        </div>
      </div>

      <div className="product-info"> {/* Аналог event-info */}
        <div className="product-price-display">{typeof displayPrice === 'number' ? displayPrice.toLocaleString('ru-RU') + ' ₽' : 'Цена не указана'}</div>
        
        <h4 className="product-title-h4"> {/* Аналог event-title */}
          {product.title || product.name}
        </h4>
        
        {/* Кнопка "Написать продавцу" теперь будет похожа на event-button */}
        <a
          href="https://t.me/apl17w" // URL для связи с продавцом
          className="seller-contact-button"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()} // Важно остановить всплытие
        >
         КУПИТЬ
        </a>
      </div>
    </div>
  );
};

export default ProductCard;