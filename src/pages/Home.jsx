import Hero from '../components/Hero';
import CategoryTiles from '../components/CategoryTiles';
import ProductGrid from '../components/ProductGrid';
import { PRODUCTS } from '../data/products';

export default function Home() {
	const trendingProducts = PRODUCTS.filter(p => p.trending);
	const newArrivals = PRODUCTS; // For now just showing all as new

	return (
		<>
			<Hero />
			<CategoryTiles />
			<ProductGrid title="Trending Now" products={trendingProducts} />
			<ProductGrid title="New Arrivals" products={newArrivals} />
		</>
	);
}
