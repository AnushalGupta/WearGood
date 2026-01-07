import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, LogOut, Package, RotateCcw, MessageSquare, Star, Coins } from 'lucide-react';
import './UserMenu.css';
import { useState } from 'react';

export default function UserMenu() {
	const { user, logout } = useAuth();
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();

	const handleLogout = async () => {
		await logout();
		setIsOpen(false);
		navigate('/');
	};

	const handleAuthAction = () => {
		setIsOpen(false);
		navigate('/login');
	}

	return (
		<div
			className="user-menu-container"
			onMouseEnter={() => setIsOpen(true)}
			onMouseLeave={() => setIsOpen(false)}
		>
			<button className="icon-btn user-trigger">
				{user ? (
					<div className="user-avatar-placeholder">
						{user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
					</div>
				) : (
					<User size={22} />
				)}
			</button>

			<div className={`user-dropdown ${isOpen ? 'active' : ''}`}>
				<div className="dropdown-links">
					<Link to="/orders" className="dropdown-item">
						<Package size={18} /> <span>Track Order</span>
					</Link>
					<Link to="/returns" className="dropdown-item">
						<RotateCcw size={18} /> <span>Return / Exchange</span>
					</Link>
					<Link to="/contact" className="dropdown-item">
						<MessageSquare size={18} /> <span>Contact Us</span>
					</Link>
					<Link to="/reviews" className="dropdown-item">
						<Star size={18} /> <span>Reviews</span>
					</Link>
					<Link to="/rewards" className="dropdown-item">
						<Coins size={18} /> <span>Cashback & Rewards</span>
					</Link>
				</div>

				<div className="dropdown-footer">
					{user ? (
						<div className="user-info-section">
							<p className="user-email">{user.email}</p>
							<button onClick={handleLogout} className="auth-action-btn logout">
								<LogOut size={16} /> Logout
							</button>
						</div>
					) : (
						<button onClick={handleAuthAction} className="auth-action-btn login">
							Log In or Sign Up
						</button>
					)}
				</div>
			</div>
		</div>
	);
}
