import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Contact from './pages/Contact';
import { ToastProvider } from './context/ToastContext';
import { CartProvider } from './context/CartContext';
import './App.css';

// Scroll to top on route change
const ScrollToTop = () => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return null;
}

function AppContent() {
  const location = useLocation();
  // Hide navbar/footer on auth pages if desired, or keep them. keeping them for now.

  return (
    <div className="app">
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <footer style={{ padding: '4rem 2rem', textAlign: 'center', background: '#333', color: '#fff', marginTop: 'auto' }}>
        <div style={{ marginBottom: '1rem' }}>
          <p>&copy; 2026 WearGood. All rights reserved.</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
          <a href="#" style={{ color: '#aaa', fontSize: '0.9rem' }}>Terms</a>
          <a href="#" style={{ color: '#aaa', fontSize: '0.9rem' }}>Privacy</a>
          <Link to="/contact" style={{ color: '#aaa', fontSize: '0.9rem' }}>Contact & Support</Link>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <ToastProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </ToastProvider>
    </Router>
  );
}

export default App;
