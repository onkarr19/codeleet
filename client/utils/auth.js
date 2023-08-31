import config from '../config';
const backendURL = config.backendUrl;

export const checkAndRedirect = async () => {
    const token = localStorage.getItem('token');
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
                window.location.href = '/profile';
            }
        } catch (error) {
            console.error('Error checking authentication:', error);
        }
    }
};
