import { useParams } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import { PRODUCTS } from '../data/products';

export default function CategoryPage() {
	const { categoryId } = useParams();

	// Simple filter for now. In real app, this would fetch from API.
	const categoryProducts = PRODUCTS.filter(
		p => p.category.toLowerCase() === categoryId?.toLowerCase()
	);

	return (
		<div className="container" style={{ paddingTop: '80px', minHeight: '80vh' }}>
			<header style={{ padding: '2rem 0', textAlign: 'center' }}>
				<h1 style={{ textTransform: 'capitalize', fontSize: '2.5rem' }}>{categoryId}</h1>
				<p style={{ color: '#666' }}>Explore our latest collection for {categoryId}</p>
			</header>

			{categoryProducts.length > 0 ? (
				<ProductGrid products={categoryProducts} />
			) : (
				<div style={{ textAlign: 'center', padding: '4rem' }}>
					<p>No products found in this category.</p>
				</div>
			)}
		</div>
	);
}
