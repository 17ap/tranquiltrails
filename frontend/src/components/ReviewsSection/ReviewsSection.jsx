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

  const visibleReviews = reviews.slice(
    currentIndex, 
    currentIndex + reviewsPerPage
  );

  if (loading) return <div>Загрузка отзывов...</div>;
  if (error) return <div>Ошибка: {error}</div>;
  if (reviews.length === 0) return <div>Нет отзывов</div>;

  return (
    <section className="reviews-section">
      <div className="container">
        <h3>Отзывы</h3>
        <div className="reviews-grid">
          {visibleReviews.map((review) => (
            <div className="review-card" key={review.id}>
              <div className="review-image">
                <img 
                  src={review.photoUrl} 
                  alt={review.full_name} 
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = '/images/default-avatar.jpg';
                  }}
                />
              </div>
              <div className="review-text">
                <h4>{review.full_name}{review.age && `, ${review.age} лет`}</h4>
                <p>{review.text}</p>
              </div>
            </div>
          ))}
        </div>
        
        {reviews.length > reviewsPerPage && (
          <div className="carousel-navigation">
          <button className="nav-button prev" onClick={prevReviews}>
            ‹
          </button>  
          <button className="nav-button next" onClick={nextReviews}>
            ›
          </button>
        </div>
        )}
      </div>
    </section>
  );
}