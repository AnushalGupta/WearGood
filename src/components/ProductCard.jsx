import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

export default function ProductCard({ product }) {
	const navigate = useNavigate();
	const { addToCart } = useCart();

	const handleCardClick = () => {
		navigate(`/product/${product.id}`);
	};

	const handleQuickAdd = (e) => {
		e.stopPropagation(); // Prevent card navigation
		addToCart(product);
	};

	return (
		<div className="product-card" onClick={handleCardClick}>
			<div className="product-image-container">
				<img src={product.image} alt={product.name} className="product-image" loading="lazy" />
				<button className="quick-add-btn" aria-label="Quick Add to Cart" onClick={handleQuickAdd}>
					<Plus size={20} /> Quick Add
				</button>
			</div>
			<div className="product-info">
				<span className="product-category">{product.category}</span>
				<h3 className="product-name">{product.name}</h3>
				<p className="product-price">${product.price}</p>
			</div>
		</div>
	);
}
