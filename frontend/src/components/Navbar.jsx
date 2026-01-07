import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Heart, Menu, X, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { BRAND_CONFIG } from '../config/constants';
import { NAV_CONTENT } from '../data/navigation';
import UserMenu from './UserMenu';
import './Navbar.css';
import './MegaMenu.css';

export default function Navbar() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [activeCategory, setActiveCategory] = useState(null);
	const navigate = useNavigate();
	const { cartCount } = useCart();

	// Hover delay logic
	let timeoutId = null;

	const handleMouseEnter = (category) => {
		if (timeoutId) clearTimeout(timeoutId);
		setActiveCategory(category);
	};

	const handleMouseLeave = () => {
		timeoutId = setTimeout(() => {
			setActiveCategory(null);
		}, 150); // 150ms delay to allow moving mouse to the menu
	};

	return (
		<nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
			<div className="container navbar-content">
				<div className="navbar-left">
					<button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
						{isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
					<Link to="/" className="brand-logo">{BRAND_CONFIG.name}</Link>
					<div className="desktop-links" onMouseLeave={handleMouseLeave}>
						<div
							className={`nav-item-wrapper ${activeCategory === 'men' ? 'active' : ''}`}
							onMouseEnter={() => handleMouseEnter('men')}
						>
							<Link to="/category/men">Men</Link>
						</div>
						<div
							className={`nav-item-wrapper ${activeCategory === 'women' ? 'active' : ''}`}
							onMouseEnter={() => handleMouseEnter('women')}
						>
							<Link to="/category/women">Women</Link>
						</div>
						<div
							className={`nav-item-wrapper ${activeCategory === 'accessories' ? 'active' : ''}`}
							onMouseEnter={() => handleMouseEnter('accessories')}
						>
							<Link to="/category/accessories">Accessories</Link>
						</div>
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
					<div className="desktop-only"><UserMenu /></div>
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
				<Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
				{/* Mobile Menu Auth Items */}
				<Link to="/orders" onClick={() => setIsMobileMenuOpen(false)}>Track Order</Link>
				<Link to="/returns" onClick={() => setIsMobileMenuOpen(false)}>Return / Exchange</Link>
				<Link to="/reviews" onClick={() => setIsMobileMenuOpen(false)}>Reviews</Link>
				<Link to="/rewards" onClick={() => setIsMobileMenuOpen(false)}>Cashback & Rewards</Link>
			</div>

			{/* Mega Menu Overlay */}
			<div
				className={`mega-menu-overlay ${activeCategory ? 'active' : ''}`}
				onMouseEnter={() => handleMouseEnter(activeCategory)}
				onMouseLeave={handleMouseLeave}
			>
				<div className="mega-menu-content">
					{(NAV_CONTENT[activeCategory] || []).map((item, idx) => (
						<Link to={item.link} key={idx} className="mega-menu-item" onClick={() => setActiveCategory(null)}>
							<img src={item.image} alt={item.name} loading="lazy" />
							<span>{item.name}</span>
						</Link>
					))}
				</div>
			</div>
		</nav>
	);
}
