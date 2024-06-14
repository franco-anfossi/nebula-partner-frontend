import { useEffect, useState } from 'react';
import api from '../api';

function CompanyProfile() {
  const [profileData, setProfileData] = useState(null);
  const [employeesData, setEmployeesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const companyResponse = await api.get('/api/users/company/current/');
        setProfileData(companyResponse.data);

        const EmployeesResponse = await api.get(
          '/api/users/company/employees/'
        );
        setEmployeesData(EmployeesResponse.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfileData();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-500">
        Error loading profile data.
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen p-4 text-indigo-600">
      <div className="mt-10 max-w-3xl mx-auto bg-white p-6 rounded-lg text-indigo-600 shadow-md">
        <h1 className="text-2xl font-bold mb-4">Company Profile</h1>
        {profileData && (
          <div>
            <p>
              <strong>Company Name:</strong> {profileData.name}
            </p>
            <p>
              <strong>Email:</strong> {profileData.email}
            </p>
            <p>
              <strong>Phone Number:</strong> {profileData.phone_number}
            </p>
            <p>
              <strong>RUT:</strong> {profileData.rut}
            </p>
          </div>
        )}
      </div>
      {employeesData.length > 0 && (
        <div className="mt-10 max-w-3xl mx-auto bg-white p-6 rounded-lg text-indigo-600 shadow-md">
          <h2 className="text-xl font-bold mb-4">Employees</h2>
          <div className="grid grid-cols-1 gap-4">
            {employeesData.map((employee) => (
              <div
                key={employee.id}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                <p>
                  <strong>Name:</strong> {employee.name}
                </p>
                <p>
                  <strong>Email:</strong> {employee.email}
                </p>
                <p>
                  <strong>Role:</strong> {employee.employee_type}
                </p>
                <p>
                  <strong>Phone Number:</strong> {employee.phone_number}
                </p>
                <p>
                  <strong>RUT:</strong> {employee.rut}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CompanyProfile;
