// MarketDetailPage.jsx
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

  // MarketDetailPage.jsx
  useEffect(() => {
    const loadData = async () => {
      let currentProduct = null;
      let products = null;
      try {
        setLoading(true);
        setError(null);


        console.log('Fetching product from API...');
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
            // Сохраняем в кэш
          } else {
            throw new Error('Товар не найден')
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
        setLoading(false);
      } catch (err) {
        console.error('Ошибка загрузки:', err);
        setError(err.message || 'Произошла ошибка при загрузке товара или рекомендаций.');
        setLoading(false);
      }
    };
    loadData();
  }, [id, location.state, navigate]); // Добавляем navigate в зависимости

  // Объединенный обработчик для навигации на страницу деталей другого товара
  const handleProductItemClick = (clickedProduct, e) => {
    // Предотвращаем всплытие, если клик был по кнопке "Написать продавцу"
    if (e.target.closest('.contact-seller-button') || e.target.closest('.recommendation-seller-button')) {
      return;
    }

    // Если клик был по всей карточке рекомендации
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

    // Переходим на страницу товара.
    navigate(`/product/${clickedProduct.id}`, { state: { product: clickedProduct } });
  };


  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">Ошибка: {error}</div>;
  if (!product) return <div className="not-found">Товар не найден</div>;

  return (
    <div className="market-detail-page">
      <Header activeLink="market" />

      <main className="product-page">
        <div className="container">
          <div className="product-card-detail"> {/* Возвращаем class="product-card" */}
            {/* Галерея товара */}
            {/* TODO исправить верстку product-gallery */}
            <div className="product-gallery"> {/* Возвращаем class="product-gallery" */}
              <div className="main-image"> {/* Возвращаем class="main-image" */}
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
            <div className="product-info"> {/* Возвращаем class="product-info" */}
              <div className="product-header">
                <h1 className="product-title"> {/* Возвращаем class="product-title" */}
                  {product.name}
                </h1>
                {product.isNew && <span className="product-badge">Новинка</span>}
              </div>

              <div className="product-price"> {/* Возвращаем class="product-price" */}
                {product.cost?.toLocaleString('ru-RU') || product.price?.toLocaleString('ru-RU')} ₽
                {product.oldPrice && (
                  <span className="old-price">
                    {product.oldPrice.toLocaleString('ru-RU')} ₽
                  </span>
                )}
              </div>

              <div className="product-availability">В наличии</div>

              <div className="product-description"> {/* Возвращаем class="product-description" */}
                <p>{product.description || 'Нет описания.'}</p>
              </div>

              {/* Кнопка "Написать продавцу" */}
              <a
                href="https://t.me/apl17w"
                className="contact-seller-button" // Новый класс для этой кнопки
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                Написать продавцу
              </a>
            </div>
          </div>

          {/* Блок рекомендаций */}
          {recommendations.length > 0 && (
           <section className="recommendations">
              <h2>Рекомендации</h2>
              <div className="recommendation-items"> {/* Этот класс останется для грида рекомендаций */}
                {recommendations.map(item => (
                  // <div // <--- ЭТОТ БЛОК БОЛЬШЕ НЕ НУЖЕН!
                  //   key={item.id}
                  //   className="recommendation-card"
                  //   onClick={(e) => handleProductItemClick(item, e)} // Логика клика теперь внутри ProductCard
                  // >
                  //   <img
                  //     src={item.imageUrl || item.image}
                  //     alt={item.name}
                  //     onError={(e) => {
                  //       e.target.src = '/images/default-product.jpg';
                  //     }}
                  //   />
                  //   <div className="recommendation-details">
                  //     <h3 className="product-title">
                  //       {item.name}
                  //     </h3>
                  //     <div className="price">
                  //       {item.cost?.toLocaleString('ru-RU') || item.price?.toLocaleString('ru-RU')} ₽
                  //     </div>
                  //     <a
                  //       href="https://t.me/apl17w"
                  //       className="recommendation-seller-button"
                  //       target="_blank"
                  //       rel="noopener noreferrer"
                  //       onClick={(e) => e.stopPropagation()}
                  //     >
                  //       Написать продавцу
                  //     </a>
                  //   </div>
                  // </div>

                  // <--- ЗАМЕНЯЕМ ЭТО НА ProductCard: --->
                  <ProductCard key={item.id} product={item} /> // Используем ProductCard!
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}