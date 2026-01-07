import { Mail, Instagram, Twitter, MapPin, Phone, Send } from 'lucide-react';
import { BRAND_CONFIG } from '../config/constants';
import './Contact.css';

export default function Contact() {
	const handleSubmit = (e) => {
		e.preventDefault();
		alert('Message sent! We will get back to you shortly.');
	};

	return (
		<div className="contact-page container">
			<div className="contact-header">
				<h1 className="section-title">Get in Touch</h1>
				<p className="contact-subtitle">We'd love to hear from you. Here's how you can reach us.</p>
			</div>

			<div className="contact-grid">
				{/* Contact Info Card */}
				<div className="contact-info-card">
					<h2>Contact Info</h2>
					<div className="info-item">
						<Mail className="icon" size={20} />
						<div>
							<h3>Email</h3>
							<p>{BRAND_CONFIG.contactEmail}</p>
						</div>
					</div>
					<div className="info-item">
						<Phone className="icon" size={20} />
						<div>
							<h3>Phone</h3>
							<p>+1 (555) 123-4567</p>
						</div>
					</div>
					<div className="info-item">
						<MapPin className="icon" size={20} />
						<div>
							<h3>Office</h3>
							<p>123 Fashion St, Design District, NY 10012</p>
						</div>
					</div>

					<div className="social-links">
						<h3>Follow Us</h3>
						<div className="social-icons">
							<a href="#" className="social-icon"><Instagram size={24} /></a>
							<a href="#" className="social-icon"><Twitter size={24} /></a>
						</div>
					</div>
				</div>

				{/* Support Form */}
				<div className="contact-form-card">
					<h2>Send a Message</h2>
					<form onSubmit={handleSubmit}>
						<div className="form-group">
							<label>Name</label>
							<input type="text" placeholder="Your Name" required />
						</div>
						<div className="form-group">
							<label>Email</label>
							<input type="email" placeholder="your@email.com" required />
						</div>
						<div className="form-group">
							<label>Message</label>
							<textarea rows="5" placeholder="How can we help?" required></textarea>
						</div>
						<button type="submit" className="submit-btn">
							Send Message <Send size={18} />
						</button>
					</form>
				</div>
			</div>

			{/* FAQ Section */}
			<div className="faq-section">
				<h2>Frequently Asked Questions</h2>
				<div className="faq-grid">
					<div className="faq-item">
						<h3>Shipping & Delivery</h3>
						<p>We ship worldwide! Standard shipping takes 5-7 business days. Express shipping options available.</p>
					</div>
					<div className="faq-item">
						<h3>Return Policy</h3>
						<p>We offer a 30-day return policy for regular priced items. Items must be unworn and tags attached.</p>
					</div>
					<div className="faq-item">
						<h3>Size Guide</h3>
						<p>Check our detailed size guide on each product page to find your perfect fit.</p>
					</div>
				</div>
			</div>
		</div>
	);
}
