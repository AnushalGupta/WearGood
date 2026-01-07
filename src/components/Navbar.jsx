import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
	ShoppingBag, Search, Heart, Menu, X, User,
	Package, RefreshCw, Star, CreditCard, ChevronRight, LogOut,
	Shirt, Sparkles, Watch, Mail
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { BRAND_CONFIG } from '../config/constants';
import { NAV_CONTENT } from '../data/navigation';
import UserMenu from './UserMenu';
import './Navbar.css';
import './MegaMenu.css';

export default function Navbar() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
	const [activeCategory, setActiveCategory] = useState(null); // Desktop Mega Menu
	const [activeMobileCategory, setActiveMobileCategory] = useState(null); // Mobile Accordion
	const navigate = useNavigate();
	const { cartCount } = useCart();
	const { user, logout } = useAuth();

	// Hover delay logic
	let timeoutId = null;

	const handleMouseEnter = (category) => {
		if (timeoutId) clearTimeout(timeoutId);
		setActiveCategory(category);
	};

	const handleMouseLeave = () => {
		timeoutId = setTimeout(() => {
			setActiveCategory(null);
		}, 150);
	};

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	// Close menus on resize
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth > 768) {
				setIsMobileMenuOpen(false);
				setIsMobileSearchOpen(false);
			}
		};
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const MobileMenuItem = ({ to, icon: Icon, label, onClick }) => (
		<Link to={to} className="mobile-menu-item" onClick={onClick}>
			<div className="mobile-menu-item-left">
				<Icon size={20} className="mobile-menu-icon" />
				<span>{label}</span>
			</div>
			<ChevronRight size={16} className="mobile-menu-arrow" />
		</Link>
	);

	return (
		<nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
			{/* Mobile Search Overlay */}
			<div className={`mobile-search-bar ${isMobileSearchOpen ? 'open' : ''}`}>
				<input
					type="text"
					placeholder="Search for products..."
					autoFocus={isMobileSearchOpen}
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							alert(`Searching for: ${e.target.value}`);
							setIsMobileSearchOpen(false);
						}
					}}
				/>
				<button className="close-search-btn" onClick={() => setIsMobileSearchOpen(false)}>
					<X size={20} />
				</button>
			</div>

			<div className="container navbar-content">
				<div className="navbar-left">
					<button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
						{isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
					<Link to="/" className="brand-logo">{BRAND_CONFIG.name}</Link>

					{/* Desktop Navigation */}
					<div className="desktop-links" onMouseLeave={handleMouseLeave}>
						{['men', 'women', 'accessories'].map((category) => (
							<div
								key={category}
								className={`nav-item-wrapper ${activeCategory === category ? 'active' : ''}`}
								onMouseEnter={() => handleMouseEnter(category)}
							>
								<Link to={`/category/${category}`}>
									{category.charAt(0).toUpperCase() + category.slice(1)}
								</Link>
							</div>
						))}
					</div>
				</div>

				<div className="navbar-right">
					<div className="search-container desktop-only">
						<input
							type="text"
							placeholder="Search..."
							className="search-input"
							onKeyDown={(e) => e.key === 'Enter' && alert(`Searching for: ${e.target.value}`)}
						/>
						<Search size={22} className="input-icon" />
					</div>

					{/* Mobile Search Trigger */}
					<button
						className="icon-btn mobile-only"
						onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
					>
						<Search size={24} />
					</button>

					{/* Mobile User Icon / Desktop User Menu */}
					<div className="mobile-only">
						{user ? (
							<button className="icon-btn" onClick={() => navigate('/orders')}>
								<User size={24} />
							</button>
						) : (
							<button className="icon-btn" onClick={() => navigate('/login')}>
								<User size={24} />
							</button>
						)}
					</div>

					<button className="icon-btn desktop-only"><Heart size={22} /></button>
					<div className="desktop-only"><UserMenu /></div>

					<button className="icon-btn cart-btn" onClick={() => navigate('/cart')}>
						<ShoppingBag size={22} />
						{cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
					</button>
				</div>
			</div>

			{/* Mobile Menu Overlay */}
			<div
				className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}
				onClick={() => setIsMobileMenuOpen(false)}
			/>

			{/* Side Drawer Mobile Menu */}
			<div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
				<div className="mobile-menu-header-section">
					<span className="mobile-menu-title">Menu</span>
					<button className="mobile-menu-close-btn" onClick={() => setIsMobileMenuOpen(false)}>
						<X size={20} />
					</button>
				</div>

				<div className="mobile-menu-section">
					{/* Expandable Categories */}
					{['men', 'women', 'accessories'].map((cat) => {
						const isExpanded = activeCategory === cat;
						return (
							<div key={cat}>
								<button
									className="mobile-category-btn"
									onClick={() => setActiveMobileCategory(activeMobileCategory === cat ? null : cat)}
								>
									<div className="mobile-menu-item-left">
										{cat === 'men' && <Shirt size={20} className="mobile-menu-icon" />}
										{cat === 'women' && <Sparkles size={20} className="mobile-menu-icon" />}
										{cat === 'accessories' && <Watch size={20} className="mobile-menu-icon" />}
										<span style={{ textTransform: 'capitalize' }}>{cat}</span>
									</div>
									<ChevronRight size={16} className={`app-chevron ${activeMobileCategory === cat ? 'rotated' : ''}`} />
								</button>
								<div className={`mobile-submenu ${activeMobileCategory === cat ? 'expanded' : ''}`}>
									{/* Dummy Subcategories based on standard e-com */}
									<Link to={`/category/${cat}/new`} className="mobile-submenu-item" onClick={() => setIsMobileMenuOpen(false)}>New Arrivals</Link>
									<Link to={`/category/${cat}/clothing`} className="mobile-submenu-item" onClick={() => setIsMobileMenuOpen(false)}>Clothing</Link>
									<Link to={`/category/${cat}/footwear`} className="mobile-submenu-item" onClick={() => setIsMobileMenuOpen(false)}>Footwear</Link>
									<Link to={`/category/${cat}/sale`} className="mobile-submenu-item" style={{ color: '#ef4444' }} onClick={() => setIsMobileMenuOpen(false)}>Sale</Link>
								</div>
							</div>
						);
					})}
				</div>

				<div className="mobile-menu-section">
					{user ? (
						<div className="mobile-menu-user">
							<div className="user-email">{user.email}</div>
							<Link to="/orders" className="mobile-menu-static-item" onClick={() => setIsMobileMenuOpen(false)}>
								<Package size={20} /> Track Order
							</Link>
							<Link to="/returns" className="mobile-menu-static-item" onClick={() => setIsMobileMenuOpen(false)}>
								<RefreshCw size={20} /> Returns
							</Link>
							<button className="logout-btn mobile-menu-static-item" onClick={() => {
								logout();
								setIsMobileMenuOpen(false);
							}}>
								<LogOut size={20} /> Log Out
							</button>
						</div>
					) : (
						<div style={{ padding: '20px' }}>
							<p style={{ marginBottom: '10px', color: '#666' }}>Login to enjoy personalized offers</p>
							{/* Minimal link if they really need it, but main auth is now in header */}
						</div>
					)}
				</div>

				<div className="mobile-menu-section">
					<Link to="/contact" className="mobile-menu-static-item" onClick={() => setIsMobileMenuOpen(false)}>
						<Mail size={20} className="mobile-menu-icon" /> Contact Us
					</Link>
				</div>
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
