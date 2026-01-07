import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShoppingBag, Star, Share2, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { PRODUCTS } from '../data/products';
import './ProductDetails.css';

export default function ProductDetails() {
	const { productId } = useParams();
	const product = PRODUCTS.find(p => p.id === parseInt(productId));

	const [selectedImage, setSelectedImage] = useState(0);
	const [selectedSize, setSelectedSize] = useState(null);
	const [pincode, setPincode] = useState('');
	const [availability, setAvailability] = useState(null);

	const { addToCart } = useCart();
	const { addToast } = useToast();

	if (!product) {
		return <div className="container" style={{ paddingTop: '100px' }}>Product not found</div>;
	}

	const handleCheckPincode = (e) => {
		e.preventDefault();
		// Mock availability check
		if (pincode.length === 6) {
			setAvailability(true);
		} else {
			setAvailability(false);
		}
	};

	return (
		<div className="product-details-page container">
			<div className="product-gallery">
				<div className="thumbnail-list">
					{(product.images || [product.image]).map((img, idx) => (
						<button
							key={idx}
							className={`thumbnail ${selectedImage === idx ? 'active' : ''}`}
							onClick={() => setSelectedImage(idx)}
						>
							<img src={img} alt={`${product.name} view ${idx + 1}`} />
						</button>
					))}
				</div>
				<div className="main-image">
					<img src={(product.images || [product.image])[selectedImage]} alt={product.name} />
				</div>
			</div>

			<div className="product-info-section">
				<h1 className="pdp-title">{product.name}</h1>
				<p className="pdp-category">{product.category}</p>

				<div className="pdp-price-row">
					<span className="pdp-price">₹{product.price.toLocaleString()}</span>
					<div className="pdp-rating">
						<Star size={16} fill="#FFD700" color="#FFD700" />
						<span>4.8 (120 reviews)</span>
					</div>
				</div>

				<p className="pdp-description">{product.description}</p>

				<div className="pdp-selector">
					<h3>Select Size</h3>
					<div className="size-grid">
						{(product.sizes || []).map(size => (
							<button
								key={size}
								className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
								onClick={() => setSelectedSize(size)}
							>
								{size}
							</button>
						))}
					</div>
				</div>

				<div className="pdp-actions">
					<button
						className="add-to-cart-btn"
						onClick={() => {
							if (!selectedSize && product.sizes) {
								addToast('Please select a size', 'error');
								return;
							}
							addToCart(product, selectedSize);
						}}
					>
						<ShoppingBag size={20} /> Add to Cart
					</button>
					<button className="wishlist-btn">
						<Share2 size={20} />
					</button>
				</div>

				<div className="pdp-pincode">
					<h3><MapPin size={18} /> Check Delivery</h3>
					<form onSubmit={handleCheckPincode} className="pincode-form">
						<input
							type="text"
							placeholder="Enter Pincode"
							value={pincode}
							onChange={(e) => setPincode(e.target.value)}
							maxLength={6}
						/>
						<button type="submit">Check</button>
					</form>
					{availability === true && <p className="success-text">Delivery available within 3-4 days!</p>}
					{availability === false && <p className="error-text">Please enter a valid 6-digit pincode.</p>}
				</div>
			</div>
		</div>
	);
}
