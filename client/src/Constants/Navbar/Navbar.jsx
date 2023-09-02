import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import config from '../../../config';
const backendURL = config.backendUrl;

import './Navbar.css';

const Navbar = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState('');

	useEffect(() => {
		const checkAuthentication = async () => {
			const token = `${localStorage.getItem('token')}`;
			if (token) {
				try {
					const response = await fetch(`${backendURL}/profile`, {
						method: 'GET',
						headers: {
							Authorization: token,
							'Content-Type': 'application/json'
						},
					});

					if (response.ok) {
						setIsLoggedIn(true);
						const data = await response.json();
						setUser(data);
					} else if (response.status === 411) setIsLoggedIn(false);
				} catch (error) {
					console.error('Error checking authentication:', error);
				}
			}
		};

		checkAuthentication();
	}, []);

	return (
		<div id='navbar-main' className='flex-row'>
			<Link to={'/'}>
				<div className="logo-box flex-row">
					<img className='logo' src="https://user-images.githubusercontent.com/63964149/152531278-5e01909d-0c2e-412a-8acc-4a06863c244d.png" alt="logo" />
					<p>CodeLeet</p>
				</div>
			</Link>
			<div className="nav-options">
				<Link to={'/problemset'} >Problems</Link>
			</div>

			{isLoggedIn ? (
				<div className="nav-options">
				<Link to={'/profile'}>{user.username}</Link>
			</div>
			) : (
				<div className="nav-options">
					<Link to={'/login'}>Login</Link>
				</div>
			)}
			
		</div>
	);
}

export default Navbar;
