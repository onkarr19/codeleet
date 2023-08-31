import React from "react";
import { useState, useEffect } from "react";


import config from '../../../config';
const backendURL = config.backendUrl;

import { checkAndRedirect } from "../../../utils/auth";


function App() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    
    const handleSignup = async () => {
        try {
            const response = await fetch(`${backendURL}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, email }),
            });

            const data = await response.json();
            
            if (response.ok) {
                // Signup successful
                console.log('Signup successful', data);
                const response = await fetch(`${backendURL}/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                });

                if (response.ok) {
                    console.log('login successful');
                    const loginData = await response.json();
                    localStorage.setItem('token', loginData.token);
                    window.location.href = '/profile';
                }

            } else {
                // Signup failed
                setErrorMessage(data.message);
            }
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    useEffect(() => {
        checkAndRedirect();
    }, []);

    return (
        <div>
            <h2>Signup</h2>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <div>
                <label>Username:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <button onClick={handleSignup}>Sign Up</button>
        </div>
    );
}

export default App;