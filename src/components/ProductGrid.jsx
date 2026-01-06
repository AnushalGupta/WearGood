import ProductCard from './ProductCard';
import './ProductGrid.css';

export default function ProductGrid({ title, products }) {
	return (
		<section className="product-grid-section container">
			{title && <h2 className="section-title">{title}</h2>}
			<div className="product-grid">
				{products.map(product => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</section>
	);
}
