import { BRAND_CONFIG } from '../config/constants';
import './Hero.css';

export default function Hero() {
	return (
		<section className="hero">
			<div className="hero-content container">
				<span className="hero-badge">New Arrival</span>
				<h1 className="hero-title">Summer Collection 2026</h1>
				<p className="hero-subtitle">{BRAND_CONFIG.tagline}</p>
				<button className="hero-cta">Shop Now</button>
			</div>
		</section>
	);
}
