import React from "react";
import { useState, useEffect } from "react";

import config from '../../../config';
const backendURL = config.backendUrl;

import { checkAndRedirect } from "../../../utils/auth";


function App() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    
    const handleLogin = async () => {
        try {
            const response = await fetch(`${backendURL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            
            if (response.ok) {
                // Signup successful
                console.log('Signup successful', data);
                localStorage.setItem('token', data.token)
                window.location.href = '/profile'
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
            <div>
                <h2>Login</h2>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
}

export default App;