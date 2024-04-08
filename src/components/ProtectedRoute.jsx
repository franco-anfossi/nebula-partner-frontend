import api from '../api';
import { jwtDecode } from 'jwt-decode';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';

function ProtectedRoute({ children }) {
    const [isAuth, setIsAuth] = useState(null);

    useEffect(() => {
        auth().catch(() => setIsAuth(false));
    }, []);

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            const response = await api.post('/api/users/token/refresh', {
                refresh: refreshToken, 
            });
            
            if (response.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, response.data.access);
                setIsAuth(true);
            } else {
                setIsAuth(false);
            }
        } catch (error) {
            console.error(error);
            setIsAuth(false);
        }
    }

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuth(false);
            return;
        }
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const currentTime = Date.now() / 1000;

        if (tokenExpiration < currentTime) {
            await refreshToken();
        } else {
            setIsAuth(true);
        }
    }

    if (isAuth === null) {
        return <div>Loading...</div>
    }

    return isAuth ? children : <Navigate to="/login" />
}

export default ProtectedRoute;