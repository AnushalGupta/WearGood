import { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle, AlertCircle } from 'lucide-react';
import './Toast.css';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }) {
	const [toasts, setToasts] = useState([]);

	const addToast = useCallback((message, type = 'success') => {
		const id = Date.now();
		setToasts(prev => [...prev, { id, message, type }]);
		setTimeout(() => removeToast(id), 3000);
	}, []);

	const removeToast = useCallback((id) => {
		setToasts(prev => prev.filter(t => t.id !== id));
	}, []);

	return (
		<ToastContext.Provider value={{ addToast }}>
			{children}
			<div className="toast-container">
				{toasts.map(toast => (
					<div key={toast.id} className={`toast toast-${toast.type}`}>
						{toast.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
						<span>{toast.message}</span>
						<button onClick={() => removeToast(toast.id)} className="toast-close">
							<X size={14} />
						</button>
					</div>
				))}
			</div>
		</ToastContext.Provider>
	);
}
