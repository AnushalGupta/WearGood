import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Heart, Menu, X, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { BRAND_CONFIG } from '../config/constants';
import './Navbar.css';

export default function Navbar() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const navigate = useNavigate();
	const { cartCount } = useCart();

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
			<div className="container navbar-content">
				<div className="navbar-left">
					<button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
						{isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
					<Link to="/" className="brand-logo">{BRAND_CONFIG.name}</Link>
					<div className="desktop-links">
						<Link to="/category/men">Men</Link>
						<Link to="/category/women">Women</Link>
						<Link to="/category/accessories">Accessories</Link>
					</div>
				</div>

				<div className="navbar-right">
					<div className="search-container">
						<input
							type="text"
							placeholder="Search..."
							className="search-input"
							onKeyDown={(e) => e.key === 'Enter' && alert(`Searching for: ${e.target.value}`)}
						/>
						<button className="icon-btn search-btn-mobile"><Search size={22} /></button>
					</div>
					<button className="icon-btn"><Heart size={22} /></button>
					<button className="icon-btn" onClick={() => navigate('/login')}><User size={22} /></button>
					<button className="icon-btn cart-btn" onClick={() => navigate('/cart')}>
						<ShoppingBag size={22} />
						{cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
					</button>
				</div>
			</div>

			{/* Mobile Menu */}
			<div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
				<Link to="/category/men" onClick={() => setIsMobileMenuOpen(false)}>Men</Link>
				<Link to="/category/women" onClick={() => setIsMobileMenuOpen(false)}>Women</Link>
				<Link to="/category/accessories" onClick={() => setIsMobileMenuOpen(false)}>Accessories</Link>
				<Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
			</div>
		</nav>
	);
}
