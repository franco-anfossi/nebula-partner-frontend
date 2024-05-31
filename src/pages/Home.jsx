import api from '../api';
import Header from '../components/Header';
import { USER_TYPE } from '../constants';
import { useEffect, useState } from 'react';

function Home() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userType = localStorage.getItem(USER_TYPE);
                let endpoint = '';

                if (userType === 'company') {
                    endpoint = '/api/users/company/';
                } else if (userType === 'employee') {
                    endpoint = '/api/users/employee/current/';
                }

                if (endpoint) {
                    const response = await api.get(endpoint);
                    setUserData(response.data);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div>
            <Header userData={userData} />
            <h1>Home</h1>
            {userData && (
                <div>
                    <h2>Welcome, {userData.name}</h2>
                    {/* Mostrar más datos del usuario si es necesario */}
                </div>
            )}
        </div>
    );
}

export default Home;
