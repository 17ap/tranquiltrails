import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer';
import './ProductCard.scss';

export default function ProductCard() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Загрузка...</div>;
  if (!product) return <div>Товар не найден</div>;

  return (
    <>
      <Header />
      <section className="event-detail">
        {/* Your card content using product data */}
        <img src={product.imageUrl} alt={product.name} />
        <h1>{product.name}</h1>
        <div className="price">{product.cost} ₽</div>
      </section>
      <Footer />
    </>
  );
}