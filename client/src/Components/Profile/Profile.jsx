import React, { useEffect, useState } from "react";

import config from '../../../config';
const backendURL = config.backendUrl;

function App() {
    const [profile, setProfile] = useState(null);
    
    useEffect(() => {
        const handleProfile = async () => {
            try {
                const response = await fetch(`${backendURL}/profile`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('token')
                    },
                });
            
                if (response.ok) {
                    const data = await response.json();
                    setProfile(data);
                } else {
                    window.location.href = '/login';
                }
            } catch (error) {
                console.error('Error retrieving profile', error);
            }
        }
        handleProfile();
    }, []);

    return (
        <div>
            <h2>Profile</h2>
            
            {
                profile ? (
                    <div>
                        <p>Name: {profile.username}</p>
                        <p>Email: {profile.email}</p>
                    </div>
                ) : ( <p>Loading profile data...</p> )
            }

        </div>

    );

}

export default App;