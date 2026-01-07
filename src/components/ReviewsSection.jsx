import { useState } from 'react';
import { Star, User } from 'lucide-react';

const MOCK_REVIEWS = [
	{ id: 1, user: 'Rahul S.', rating: 5, date: '2 days ago', comment: 'Absolutely love the quality! Fits perfectly and feels premium.' },
	{ id: 2, user: 'Priya M.', rating: 4, date: '1 week ago', comment: 'Great product, but delivery took a day longer than expected.' },
	{ id: 3, user: 'Amit K.', rating: 5, date: '2 weeks ago', comment: 'Value for money. Will definitely buy again.' }
];

export default function ReviewsSection() {
	const [activeTab, setActiveTab] = useState('reviews');

	return (
		<div className="reviews-section" id="reviews-section">
			<h2 className="section-title">Ratings & Reviews</h2>

			<div className="rating-summary">
				<div className="overall-rating">
					<span className="big-rating">4.8</span>
					<div className="stars">
						{[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="#FFD700" color="#FFD700" />)}
					</div>
					<span className="total-ratings">Based on 120 reviews</span>
				</div>
			</div>

			<div className="reviews-list">
				{MOCK_REVIEWS.map(review => (
					<div key={review.id} className="review-card">
						<div className="review-header">
							<div className="reviewer-info">
								<div className="reviewer-avatar">
									<User size={16} />
								</div>
								<span className="reviewer-name">{review.user}</span>
							</div>
							<span className="review-date">{review.date}</span>
						</div>
						<div className="review-rating">
							{[...Array(review.rating)].map((_, i) => (
								<Star key={i} size={14} fill="#FFD700" color="#FFD700" />
							))}
						</div>
						<p className="review-comment">{review.comment}</p>
					</div>
				))}
			</div>

			<button className="write-review-btn">Write a Review</button>
		</div>
	);
}
