import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Cart.css';

export default function Cart() {
	const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

	if (cartItems.length === 0) {
		return (
			<div className="container empty-cart-container">
				<h1 className="section-title">Your Cart</h1>
				<div className="empty-state">
					<p>Your cart is currently empty.</p>
					<Link to="/" className="continue-btn">Continue Shopping</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="container cart-page">
			<h1 className="section-title">Shopping Cart</h1>

			<div className="cart-layout">
				<div className="cart-items">
					{cartItems.map((item) => (
						<div key={`${item.id}-${item.selectedSize}`} className="cart-item">
							<div className="cart-item-image">
								<img src={item.image} alt={item.name} />
							</div>
							<div className="cart-item-details">
								<h3>{item.name}</h3>
								<p className="cart-item-meta">{item.category} | Size: {item.selectedSize}</p>
								<div className="cart-item-controls">
									<div className="qty-control">
										<button onClick={() => updateQuantity(item.id, item.selectedSize, -1)} disabled={item.quantity <= 1}><Minus size={16} /></button>
										<span>{item.quantity}</span>
										<button onClick={() => updateQuantity(item.id, item.selectedSize, 1)}><Plus size={16} /></button>
									</div>
								</div>
							</div>
							<div className="cart-item-price-col">
								<p className="item-price">${(item.price * item.quantity).toFixed(2)}</p>
								<button className="remove-btn" onClick={() => removeFromCart(item.id, item.selectedSize)}>
									<Trash2 size={18} />
								</button>
							</div>
						</div>
					))}
				</div>

				<div className="cart-summary">
					<h2>Order Summary</h2>
					<div className="summary-row">
						<span>Subtotal</span>
						<span>${cartTotal.toFixed(2)}</span>
					</div>
					<div className="summary-row">
						<span>Shipping</span>
						<span>Free</span>
					</div>
					<div className="summary-row total">
						<span>Total</span>
						<span>${cartTotal.toFixed(2)}</span>
					</div>
					<button className="checkout-btn">
						Checkout <ArrowRight size={20} />
					</button>
				</div>
			</div>
		</div>
	);
}
