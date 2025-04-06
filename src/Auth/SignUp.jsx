import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function SignUp() {

    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!fname || !lname || !email || !password) {
            setError('Please fill in all the fields.');
            return;
        }

        fetch('http://localhost:5000/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fname, lname, email, password }),
        })
            .then(async (res) => {
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || 'Signup failed');
                navigate('/dashboard');
            })
            .catch((err) => {
                console.error('Signup error:', err.message);
                setError(err.message);
            });

    };

    return (
        <div className="login-container">
            <h2>Sign Up</h2>

            {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>First Name:</label>
                    <input
                        type="text"
                        placeholder="Enter your first name"
                        value={fname}
                        onChange={(e) => setFname(e.target.value)}
                        className="input-field"
                    />
                </div>
                <div className="input-group">
                    <label>Last Name:</label>
                    <input
                        type="text"
                        placeholder="Enter your last name"
                        value={lname}
                        onChange={(e) => setLname(e.target.value)}
                        className="input-field"
                    />
                </div>
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

                <button className="login-button">SignUp</button>
            </form>
            <p className="signup-text">
                Have an account? <Link to="/login">Sign in</Link>
            </p>
        </div>
    );
}

export default SignUp;