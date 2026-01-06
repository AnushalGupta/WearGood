import { Link } from 'react-router-dom';
import { BRAND_CONFIG } from '../config/constants';
import './Auth.css';

export default function Signup() {
	return (
		<div className="auth-container">
			<div className="auth-card">
				<h2>Create Account</h2>
				<p className="auth-subtitle">Join {BRAND_CONFIG.name} today</p>

				<form className="auth-form" onSubmit={(e) => e.preventDefault()}>
					<div className="form-group">
						<label>Full Name</label>
						<input type="text" placeholder="John Doe" required />
					</div>
					<div className="form-group">
						<label>Email Address</label>
						<input type="email" placeholder="you@example.com" required />
					</div>
					<div className="form-group">
						<label>Password</label>
						<input type="password" placeholder="••••••••" required />
					</div>
					<button type="submit" className="auth-btn">Create Account</button>
				</form>

				<p className="auth-footer">
					Already have an account? <Link to="/login">Log In</Link>
				</p>
			</div>
		</div>
	);
}
