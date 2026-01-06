
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BRAND_CONFIG } from '../config/constants';
import './Auth.css';

export default function Signup() {
	const [fullName, setFullName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { signUpWithEmail, loginWithGoogle } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const success = await signUpWithEmail(email, password, fullName);
		if (success) {
			// Usually we show "Check email", but for now redirect or stay
			navigate('/login');
		}
	};

	return (
		<div className="auth-container">
			<div className="auth-card">
				<h2>Create Account</h2>
				<p className="auth-subtitle">Join {BRAND_CONFIG.name} today</p>

				<form className="auth-form" onSubmit={handleSubmit}>
					<div className="form-group">
						<label>Full Name</label>
						<input
							type="text"
							placeholder="John Doe"
							required
							value={fullName}
							onChange={(e) => setFullName(e.target.value)}
						/>
					</div>
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

					<button type="submit" className="auth-btn">Sign Up</button>

					<button type="button" className="auth-btn google-btn" onClick={loginWithGoogle}>
						Continue with Google
					</button>
				</form>

				<div className="auth-footer">
					Already have an account? <Link to="/login">Log In</Link>
				</div>
			</div>
		</div>
	);
}

