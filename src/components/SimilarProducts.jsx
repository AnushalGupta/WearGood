import { Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';

export default function SimilarProducts({ currentProduct }) {
	const similarItems = PRODUCTS.filter(
		p => p.category === currentProduct.category && p.id !== currentProduct.id
	).slice(0, 4);

	if (similarItems.length === 0) return null;

	return (
		<div className="similar-products-section">
			<h2 className="section-title">Similar Products</h2>
			<div className="similar-grid">
				{similarItems.map(product => (
					<Link to={`/product/${product.id}`} key={product.id} className="similar-card">
						<div className="similar-img-wrapper">
							<img src={product.image} alt={product.name} />
						</div>
						<div className="similar-info">
							<h4 className="similar-name">{product.name}</h4>
							<p className="similar-price">₹{product.price.toLocaleString()}</p>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}
