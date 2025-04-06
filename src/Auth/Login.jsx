import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        fetch('http://localhost:5000/api/auth/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        })
            .then(async (res) => {
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || 'Login failed');
                navigate('/dashboard');
            })
            .catch(err => {
                console.error('Login error:', err.message);
                setError(err.message);
            });
    };

    return (
        <div className="login-container">
            <h2>Welcome Back</h2>
            {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Email:</label>
                    <input
                        type="text"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input-field"
                    />
                </div>

                <div className="input-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input-field"
                    />
                </div>

                <button className="login-button">Login</button>
            </form>
            <p className="signup-text">
                Don’t have an account? <Link to="/signup">Sign up</Link>
            </p>
        </div>
    );
}

export default Login;
