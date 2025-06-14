// src/components/MarketSection/MarketSection.jsx
import { useState, useEffect } from 'react';
import ProductCard from "../ProductCard/ProductCard"; // Импортируем ProductCard
// import './MarketSection.scss'; // Если есть SCSS файл для MarketSection, не забудьте его импортировать

export default function MarketSection({ limit = 3 }) { // Добавляем пропс limit для ограничения количества
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Попытка загрузить из кэша сначала (как в MarketPage)
        const cachedData = localStorage.getItem('all_products');
        const cachedTime = localStorage.getItem('all_products_timestamp');

        if (cachedData && cachedTime) {
          const parsedData = JSON.parse(cachedData);
          const isCacheValid = Date.now() - Number(cachedTime) < 3600000; // 1 час

          if (isCacheValid && Array.isArray(parsedData)) {
            setProducts(parsedData);
            setLoading(false);
            return;
          }
        }

        // Если нет кэша или он устарел, делаем запрос к API
        const response = await fetch('/api/products');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (!data?.success || !Array.isArray(data.products)) {
          throw new Error('Invalid data format from server');
        }

        setProducts(data.products);
        // Сохраняем в кэш для будущих загрузок
        localStorage.setItem('all_products', JSON.stringify(data.products));
        localStorage.setItem('all_products_timestamp', Date.now().toString());

      } catch (err) {
        console.error('Fetch error in MarketSection:', err);
        setError(err.message || 'Произошла ошибка при загрузке товаров для секции Маркет');

        // Попытка загрузить из бэкап-кэша, если основной запрос не удался
        const backupData = localStorage.getItem('all_products');
        if (backupData) {
          try {
            const parsed = JSON.parse(backupData);
            if (Array.isArray(parsed)) {
              setProducts(parsed);
            }
          } catch (e) {
            console.error('Backup data load error in MarketSection:', e);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="market">
        <div className="container">
          <h2 className="section-title">МАРКЕТ</h2>
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Загрузка товаров...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="market">
        <div className="container">
          <h2 className="section-title">МАРКЕТ</h2>
          <div className="error-container">
            <p className="error-message">{error}</p>
            {products.length > 0 && (
              <p className="info-message">Показаны данные из кэша</p>
            )}
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="market">
        <div className="container">
          <h2 className="section-title">МАРКЕТ</h2>
          <div className="no-products">
            <p>В данный момент товары отсутствуют.</p>
          </div>
        </div>
      </section>
    );
  }

  // Берем только указанное количество продуктов (по умолчанию 3)
  const displayedProducts = products.slice(0, limit);

  return (
    <section className="market">
      <div className="container">
        <h2 className="section-title">МАРКЕТ</h2>

        <div className="products-grid">
          {displayedProducts.map(product => (
            // Больше не нужна обертка с onClick, ProductCard сам обрабатывает клик
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
       
      </div>
    </section>
  );
}