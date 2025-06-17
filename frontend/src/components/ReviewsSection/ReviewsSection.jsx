import { useState, useEffect } from 'react';

export default function ReviewsSection() {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const reviewsPerPage = 3;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setReviews(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const nextReviews = () => {
    setCurrentIndex(prev => 
      prev + reviewsPerPage >= reviews.length ? 0 : prev + 1
    );
  };

  const prevReviews = () => {
    setCurrentIndex(prev => 
      prev === 0 ? reviews.length - reviewsPerPage : prev - 1
    );
  };

  const getVisibleReviews = () => {
    let endIndex = currentIndex + reviewsPerPage;
    if (endIndex > reviews.length) {
      endIndex = reviews.length;
    }
    return reviews.slice(currentIndex, endIndex);
  };

  const visibleReviews = getVisibleReviews();

  if (loading) return <div>Загрузка отзывов...</div>;
  if (error) return <div>Ошибка: {error}</div>;
  if (reviews.length === 0) return <div>Нет отзывов</div>;

  return (
    <section className="reviews-section">
      <div className="container">
        <h2 class='section-title'>ОТЗЫВЫ</h2>
        <div className="reviews-grid">
          {visibleReviews.map((review) => (
            <div className="review-card" key={review.id}>
              <div className="review-image">
                <img 
                  src={review.photoUrl} 
                  alt={review.name} 
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = '/images/default-avatar.jpg'; 
                  }}
                />
              </div>
              <div className="review-text">
                <h4>{review.name}{review.age && `, ${review.age} лет`}</h4>
                <p>{review.text}</p>
              </div>
            </div>
          ))}
        </div>
        
        {reviews.length > reviewsPerPage && (
          <div className="carousel-navigation">
            <button className="nav-button prev" onClick={prevReviews}>
              {/* Встроенная SVG-иконка для "назад" (шеврон влево) */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>  
            <button className="nav-button next" onClick={nextReviews}>
              {/* Встроенная SVG-иконка для "вперед" (шеврон вправо) */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}