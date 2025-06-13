// Component for Market Section
export default function MarketSection() {
  const products = [
    {
      id: 1,
      image: "/images/Подставка.jpg",
      title: "Керамическая подставка",
      price: "1 200 ₽"
    },
    {
      id: 2,
      image: "/images/Благовония.jpg",
      title: "Пало санто",
      price: "400 ₽"
    },
    {
      id: 3,
      image: "/images/Свечи.jpg",
      title: "Свечи из вощины",
      price: "300 ₽"
    }
  ];

  return (
    <section className="market">
      <div className="container">
        <h2 className="section-title">МАРКЕТ</h2>
        
        <div className="products-grid">
          {products.map(product => (
            <div className="product-card" key={product.id}>
              <div className="product-image">
                <img src={product.image} alt={product.title} loading="lazy" />
              </div>
              <div className="product-info">
                <div className="product-price">{product.price}</div>
                <h3 className="product-title">{product.title}</h3>
                <a href="#" className="tg-action">
                  <img src="/images/tg.png" alt="Telegram" className="tg-icon" loading="lazy" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}