import { CATEGORIES } from '../data/products';
import './CategoryTiles.css';

export default function CategoryTiles() {
	return (
		<section className="category-section container">
			<h2 className="section-title">Shop by Category</h2>
			<div className="category-grid">
				{CATEGORIES.map(cat => (
					<div key={cat.id} className="category-tile">
						<img src={cat.image} alt={cat.name} loading="lazy" />
						<div className="category-overlay">
							<h3 className="category-name">{cat.name}</h3>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
