import api from '../api';
import Header from '../components/Header';
import { USER_TYPE } from '../constants';
import { useEffect, useState } from 'react';
import BuyerHome from '../components/BuyerHome';
import SellerHome from '../components/SellerHome';

function Home() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userType = localStorage.getItem(USER_TYPE);
        let endpoint = '';

        if (userType === 'company') {
          endpoint = '/api/users/company/current/';
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
      {userData && (
        <div>
          {userData.employee_type === 'buyer' ? (
            <BuyerHome />
          ) : userData.employee_type === 'seller' ? (
            <SellerHome />
          ) : (
            <p>Invalid user type</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
