import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useToast } from './ToastContext';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Enable this to test without Supabase during outage
const MOCK_MODE = false; // Set to true to bypass Supabase

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const { addToast } = useToast();

	useEffect(() => {
		if (MOCK_MODE) {
			setLoading(false);
			return;
		}

		// Check active sessions and subscribe to auth changes
		supabase.auth.getSession().then(({ data: { session } }) => {
			setUser(session?.user ?? null);
			setLoading(false);
		});

		// Listen for changes
		const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
			setUser(session?.user ?? null);
			setLoading(false);
		});

		return () => subscription.unsubscribe();
	}, []);

	const loginWithGoogle = async () => {
		if (MOCK_MODE) {
			addToast('Mock mode: Google login simulated', 'success');
			return;
		}
		try {
			const { error } = await supabase.auth.signInWithOAuth({
				provider: 'google',
			});
			if (error) throw error;
		} catch (error) {
			addToast(error.message, 'error');
		}
	};

	const loginWithEmail = async (email, password) => {
		if (MOCK_MODE) {
			addToast('Mock mode: Login simulated', 'success');
			setUser({ email, id: 'mock-user' });
			return true;
		}
		try {
			const { data, error } = await supabase.auth.signInWithPassword({
				email,
				password
			});
			if (error) throw error;
			addToast('Welcome back!');
			return true;
		} catch (error) {
			addToast(error.message || 'Login failed', 'error');
			return false;
		}
	};

	const signUpWithEmail = async (email, password, fullName) => {
		if (MOCK_MODE) {
			addToast('Mock mode: Signup simulated', 'success');
			setUser({ email, id: 'mock-user', user_metadata: { full_name: fullName } });
			return true;
		}
		try {
			const { data, error } = await supabase.auth.signUp({
				email,
				password,
				options: {
					data: {
						full_name: fullName
					}
				}
			});
			if (error) throw error;
			addToast('Account created! Please verify your email.');
			return true;
		} catch (error) {
			addToast(error.message || 'Signup failed', 'error');
			return false;
		}
	}

	const logout = async () => {
		if (MOCK_MODE) {
			setUser(null);
			addToast('Mock mode: Logged out');
			return;
		}
		const { error } = await supabase.auth.signOut();
		if (error) addToast(error.message, 'error');
		else addToast('Logged out successfully');
	};

	return (
		<AuthContext.Provider value={{ user, loading, loginWithGoogle, loginWithEmail, signUpWithEmail, logout }}>
			{!loading && children}
		</AuthContext.Provider>
	);
}
