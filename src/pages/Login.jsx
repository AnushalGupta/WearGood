import { Link } from 'react-router-dom';
import { BRAND_CONFIG } from '../config/constants';
import './Auth.css';

export default function Login() {
	return (
		<div className="auth-container">
			<div className="auth-card">
				<h2>Welcome Back</h2>
				<p className="auth-subtitle">Login to {BRAND_CONFIG.name}</p>

				<form className="auth-form" onSubmit={(e) => e.preventDefault()}>
					<div className="form-group">
						<label>Email Address</label>
						<input type="email" placeholder="you@example.com" required />
					</div>
					<div className="form-group">
						<label>Password</label>
						<input type="password" placeholder="••••••••" required />
					</div>
					<button type="submit" className="auth-btn">Sign In</button>
				</form>

				<p className="auth-footer">
					Don't have an account? <Link to="/signup">Sign Up</Link>
				</p>
			</div>
		</div>
	);
}
