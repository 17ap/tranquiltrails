// src/pages/MarketPage/MarketPage.jsx
import { useState, useEffect } from 'react';
import ProductCard from '../../ProductCard/ProductCard';
import { useNavigate } from 'react-router-dom';


const MarketPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('Все');
  const [categories, setCategories] = useState(['Все']);

  // ... (логика fetchProducts и updateCategories остается без изменений) ...
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const cachedData = localStorage.getItem('all_products');
        const cachedTime = localStorage.getItem('all_products_timestamp');

        if (cachedData && cachedTime) {
          const parsedData = JSON.parse(cachedData);
          const isCacheValid = Date.now() - Number(cachedTime) < 3600000; // 1 час

          if (isCacheValid && Array.isArray(parsedData)) {
            setProducts(parsedData);
            setFilteredProducts(parsedData);
            updateCategories(parsedData);
            setLoading(false);
            return;
          }
        }

        const response = await fetch('/api/products');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (!data?.success || !Array.isArray(data.products)) {
          throw new Error('Invalid data format from server');
        }

        setProducts(data.products);
        setFilteredProducts(data.products);
        updateCategories(data.products);

        localStorage.setItem('all_products', JSON.stringify(data.products));
        localStorage.setItem('all_products_timestamp', Date.now().toString());

      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message || 'Произошла ошибка при загрузке товаров');

        const backupData = localStorage.getItem('all_products');
        if (backupData) {
          try {
            const parsed = JSON.parse(backupData);
            if (Array.isArray(parsed)) {
              setProducts(parsed);
              setFilteredProducts(parsed);
              updateCategories(parsed);
            }
          } catch (e) {
            console.error('Backup data error:', e);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    const updateCategories = (productsList) => {
      try {
        const uniqueCategories = ['Все', ...new Set(
          productsList
            .map(p => p?.category)
            .filter(c => c && typeof c === 'string')
        )];
        setCategories(uniqueCategories);
      } catch (e) {
        console.error('Category update error:', e);
        setCategories(['Все']);
      }
    };

    fetchProducts();
  }, []);

  // Логика handleProductClick в MarketPage.jsx остаётся.
  // Это позволит вам иметь обертку для ProductCard, если она нужна на MarketPage
  // для добавления telegram-кнопки или других элементов поверх ProductCard.
  const handleProductClick = (product, e) => {
    // Проверяем, был ли клик по элементу с классом 'tg-action' или 'tg-icon'
    if (e.target.closest('.tg-action') || e.target.closest('.tg-icon')) {
      // Если клик был по Telegram-иконке, не делаем навигацию по продукту
      return; 
    }
  
    // Сохраняем полный объект товара
    const viewedProducts = JSON.parse(localStorage.getItem('viewed_products') || '[]');
    const existingIndex = viewedProducts.findIndex(p => p.id === product.id);
  
    if (existingIndex >= 0) {
      viewedProducts.splice(existingIndex, 1);
    }
  
    // Сохраняем минимально необходимые данные для рекомендаций
    viewedProducts.unshift({
      id: product.id,
      name: product.name,
      imageUrl: product.imageUrl || product.image,
      cost: product.cost || product.price,
      category: product.category
    });
  
    localStorage.setItem('viewed_products', JSON.stringify(viewedProducts.slice(0, 10)));
    navigate(`/product/${product.id}`, { state: { product } });
  };


  const handleFilter = (category) => {
    setActiveCategory(category);

    if (category === 'Все') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product?.category &&
        product.category.toLowerCase() === category.toLowerCase()
      );
      setFilteredProducts(filtered);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Загрузка товаров...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        {products.length > 0 && (
          <p className="info-message">Показаны данные из кэша</p>
        )}
      </div>
    );
  }

  return (
    <section className="market">
      <div className="container">
        <h1 className="market-title">Маркет</h1>

        <div className="filter-tabs">
          {categories.map(category => (
            <button
              key={category}
              className={`filter-tab ${activeCategory === category ? 'active' : ''}`}
              onClick={() => handleFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <div
                key={product.id}
                // На MarketPage обертка `product-card-wrapper` все еще обрабатывает клик
                // это позволяет разместить Telegram-иконку вне ProductCard, но связанную с ней
                onClick={(e) => handleProductClick(product, e)}
                className="product-card-wrapper"
              >
                <ProductCard product={product} /> {/* Используем ProductCard */}
                {/* Кнопка связи в Telegram */}
               
              </div>
            ))
          ) : (
            <div className="no-products">
              {/* Сообщение об отсутствии товаров */}
              <p>К сожалению, товары по выбранной категории пока не найдены.</p>
              <button onClick={() => handleFilter('Все')} className="back-to-all-button">
                Показать все товары
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MarketPage;