import { useEffect, useState } from 'react';
import api from '../api';
import { USER_TYPE } from '../constants';
import Header from '../components/Header';
import CompanyProfile from '../components/CompanyProfile';
import SellerProfile from '../components/SellerProfile';
import BuyerProfile from '../components/BuyerProfile';

function Profile() {
  const userType = localStorage.getItem(USER_TYPE);
  const [employeeType, setEmployeeType] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployeeType = async () => {
      try {
        if (userType === 'employee') {
          const response = await api.get('/api/users/employee/current/');
          setEmployeeType(response.data.employee_type);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching employee type:', error);
        setLoading(false);
      }
    };
    fetchEmployeeType();
  }, [userType]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div>
      <Header />
      {userType === 'employee' && employeeType === 'seller' && (
        <SellerProfile />
      )}
      {userType === 'employee' && employeeType === 'buyer' && <BuyerProfile />}
      {userType === 'company' && <CompanyProfile />}
    </div>
  );
}

export default Profile;
