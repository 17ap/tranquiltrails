import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Header from '../../Header/Header';
import ProductCard from '../../ProductCard/ProductCard';

export default function MarketDetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      let currentProduct = null;
      let products = null;
      try {
        setLoading(true);
        setError(null);

        // console.log('Fetching product from API...'); // Можно раскомментировать для отладки
        const response = await fetch(`/api/products`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.success) {
          const foundProduct = data.products.find(e => e.id === id);
          if (foundProduct) {
            currentProduct = foundProduct;
            products = data.products;
          } else {
            throw new Error('Товар не найден');
          }
        } else {
          throw new Error(data.error || 'Товар не найден на сервере.');
        }

        if (currentProduct) {
          setProduct(currentProduct);
          setSelectedImage(0); // Сброс выбранного изображения при смене продукта

          const recommendedProducts = products
            .filter(e => e.id !== id)
            .slice(0, 3);

          setRecommendations(recommendedProducts);
        } else {
          setError('Товар не найден.');
        }
      } catch (err) {
        console.error('Ошибка загрузки:', err);
        setError(err.message || 'Произошла ошибка при загрузке товара или рекомендаций.');
      } finally { // Перемещаем setLoading(false) в finally
        setLoading(false);
      }
    };
    loadData();
  }, [id]); // Удаляем location.state и navigate из зависимостей, так как они не используются напрямую внутри useEffect для загрузки данных

  // Объединенный обработчик для навигации на страницу деталей другого товара
  const handleProductItemClick = (clickedProduct, e) => {
    // Предотвращаем всплытие, если клик был по кнопке "Написать продавцу"
    if (e.target.closest('.contact-seller-button') || e.target.closest('.recommendation-seller-button')) {
      return;
    }

    // Обновляем историю просмотров
    const viewedProducts = JSON.parse(localStorage.getItem('viewed_products') || '[]');
    const existingIndex = viewedProducts.findIndex(p => p.id === clickedProduct.id);

    if (existingIndex >= 0) {
      viewedProducts.splice(existingIndex, 1);
    }

    viewedProducts.unshift({
      id: clickedProduct.id,
      name: clickedProduct.name,
      imageUrl: clickedProduct.imageUrl || clickedProduct.image,
      cost: clickedProduct.cost || clickedProduct.price,
      category: clickedProduct.category
    });
    localStorage.setItem('viewed_products', JSON.stringify(viewedProducts));


    // Переходим на страницу товара.
    navigate(`/product/${clickedProduct.id}`, { state: { product: clickedProduct } });
  };


  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">Ошибка: {error}</div>;
  if (!product) return <div className="not-found">Товар не найден</div>;

  return (
    <div className="market-detail-page">
      <Header activeLink="market" />

      <main className="container"> {/* Главный контейнер для центрирования контента */}
        <section className="product-content"> {/* Переименовал с product-card-detail для унификации */}
          {/* Галерея товара */}
          <div className="product-gallery">
            <div className="main-image">
              <img
                src={product.images?.[selectedImage] || product.imageUrl || product.image}
                alt={product.name}
                loading="lazy"
                onError={(e) => {
                  e.target.src = '/images/default-product.jpg';
                }}
              />
            </div>

            {product.images?.length > 1 && (
              <div className="thumbnail-grid">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={img} alt={`Вариант ${index + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Информация о товаре */}
          <div className="product-information">
            <h1 >{product.name}</h1>
            {product.isNew && <span className="product-badge">Новинка</span>}

            <div className="product-meta"> {/* Добавил product-meta как в EventDetailPage */}
                <span className="price">
                    {product.cost?.toLocaleString('ru-RU') || product.price?.toLocaleString('ru-RU')} ₽
                </span>
                {product.oldPrice && (
                  <span className="old-price">
                    {product.oldPrice.toLocaleString('ru-RU')} ₽
                  </span>
                )}
            </div>

            <div className="product-availability">В наличии</div>

            <div className="product-description">
              <p>{product.description || 'Нет описания.'}</p>
            </div>

            {/* Кнопка "Написать продавцу" */}
            <div class="market-btn">
            <a
              href="https://t.me/apl17w"
              className="contact-seller-button"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              Написать продавцу
            </a>
            </div>
          </div>
        </section>

        {/* Блок рекомендаций */}
        {recommendations.length > 0 && (
          <section className="recommended-products"> {/* Переименовал для ясности */}
            <h2 className="section-title">Рекомендуем также</h2> {/* Используем section-title */}
            <div className="products-grid"> {/* Новый класс для грида рекомендаций */}
              {recommendations.map(item => (
                <ProductCard
                  key={item.id}
                  product={item}
                  onClick={(e) => handleProductItemClick(item, e)} // Передаем обработчик в ProductCard
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}