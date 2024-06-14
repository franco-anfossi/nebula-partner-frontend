import { useEffect, useState } from 'react';
import api from '../api';
import Header from '../components/Header';
import { USER_TYPE } from '../constants';
import BuyerHome from '../components/BuyerHome';
import SellerHome from '../components/SellerHome';

function Home() {
  const [userData, setUserData] = useState(null);
  const userType = localStorage.getItem(USER_TYPE);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        let endpoint = '';

        if (userType === 'employee') {
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

    if (userType === 'employee') {
      fetchUserData();
    }
  }, [userType]);

  return (
    <div>
      <Header />
      {userType === 'company' ? (
        <div className="text-center mt-10">Welcome, Company!</div>
      ) : userData ? (
        <div>
          {userData.employee_type === 'buyer' ? (
            <BuyerHome />
          ) : userData.employee_type === 'seller' ? (
            <SellerHome />
          ) : (
            <p>Invalid user type</p>
          )}
        </div>
      ) : (
        <div className="text-center mt-10">Loading...</div>
      )}
    </div>
  );
}

export default Home;
