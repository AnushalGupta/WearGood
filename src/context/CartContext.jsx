import { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
	const [cartItems, setCartItems] = useState(() => {
		try {
			const saved = localStorage.getItem('weargood_cart');
			return saved ? JSON.parse(saved) : [];
		} catch {
			return [];
		}
	});

	const { addToast } = useToast();

	useEffect(() => {
		localStorage.setItem('weargood_cart', JSON.stringify(cartItems));
	}, [cartItems]);

	const addToCart = (product, size = null) => {
		// If product needs size but none selected, return false or error? 
		// We'll assume validation happens at UI level, or default to first size if exists.
		const selectedSize = size || (product.sizes ? product.sizes[0] : 'One Size');

		setCartItems(prev => {
			const existing = prev.find(item => item.id === product.id && item.selectedSize === selectedSize);
			if (existing) {
				return prev.map(item =>
					(item.id === product.id && item.selectedSize === selectedSize)
						? { ...item, quantity: item.quantity + 1 }
						: item
				);
			}
			return [...prev, { ...product, selectedSize, quantity: 1 }];
		});

		addToast(`Added ${product.name} to bag`);
	};

	const removeFromCart = (id, selectedSize) => {
		setCartItems(prev => prev.filter(item => !(item.id === id && item.selectedSize === selectedSize)));
		addToast('Removed from bag', 'error');
	};

	const updateQuantity = (id, selectedSize, delta) => {
		setCartItems(prev => prev.map(item => {
			if (item.id === id && item.selectedSize === selectedSize) {
				const newQty = Math.max(1, item.quantity + delta);
				return { ...item, quantity: newQty };
			}
			return item;
		}));
	};

	const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
	const cartTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

	return (
		<CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, cartCount, cartTotal }}>
			{children}
		</CartContext.Provider>
	);
}
