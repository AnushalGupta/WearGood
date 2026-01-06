import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function TestAuth() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [status, setStatus] = useState('');
	const [details, setDetails] = useState('');

	const handleLogin = async () => {
		setStatus('Testing connection...');
		setDetails('');

		try {
			console.log('Attempting login with:', email);

			const { data, error } = await supabase.auth.signInWithPassword({
				email,
				password
			});

			if (error) {
				setStatus(`❌ Error: ${error.message}`);
				setDetails(JSON.stringify(error, null, 2));
				console.error('Supabase Error:', error);
			} else {
				setStatus(`✅ Success! Logged in as ${data.user.email}`);
				setDetails(JSON.stringify(data, null, 2));
				console.log('Supabase Success:', data);
			}
		} catch (err) {
			setStatus(`❌ Network/Client Error: ${err.message}`);
			setDetails(err.toString());
			console.error('Client Error:', err);
		}
	};

	return (
		<div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
			<h1>Supabase Connection Test</h1>

			<div style={{ marginBottom: '20px' }}>
				<p><strong>URL:</strong> {import.meta.env.VITE_SUPABASE_URL}</p>
				<p><strong>Key Status:</strong> {import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Present' : 'Missing'}</p>
			</div>

			<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={e => setEmail(e.target.value)}
					style={{ padding: '10px' }}
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={e => setPassword(e.target.value)}
					style={{ padding: '10px' }}
				/>
				<button
					onClick={handleLogin}
					style={{ padding: '10px', background: 'blue', color: 'white' }}
				>
					Test Direct Login
				</button>
			</div>

			<div style={{ marginTop: '20px', padding: '20px', background: '#f5f5f5', borderRadius: '5px' }}>
				<h3>Status:</h3>
				<p>{status}</p>
				{details && (
					<pre style={{ overflow: 'auto', maxHeight: '300px' }}>
						{details}
					</pre>
				)}
			</div>
		</div>
	);
}
