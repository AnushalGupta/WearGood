import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BRAND_CONFIG } from '../config/constants';
import './Auth.css';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { loginWithEmail, loginWithGoogle, user } = useAuth();
	const navigate = useNavigate();

	// Redirect if already logged in
	useEffect(() => {
		if (user) {
			navigate('/');
		}
	}, [user, navigate]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const success = await loginWithEmail(email, password);
		if (success) navigate('/');
	};

	return (
		<div className="auth-container">
			<div className="auth-card">
				<h2>Welcome Back</h2>
				<p className="auth-subtitle">Login to {BRAND_CONFIG.name}</p>

				<form className="auth-form" onSubmit={handleSubmit}>
					<div className="form-group">
						<label>Email Address</label>
						<input
							type="email"
							placeholder="you@example.com"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<label>Password</label>
						<input
							type="password"
							placeholder="••••••••"
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					<div className="form-group box-check">
						<input type="checkbox" id="remember" />
						<label htmlFor="remember">Remember me</label>
					</div>

					<button type="submit" className="auth-btn">Log In</button>

					<button type="button" className="auth-btn google-btn" onClick={loginWithGoogle}>
						Continue with Google
					</button>
				</form>

				<div className="auth-footer">
					Don't have an account? <Link to="/signup">Sign Up</Link>
				</div>
			</div>
		</div>
	);
}
