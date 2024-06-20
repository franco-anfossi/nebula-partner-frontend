import { useEffect, useState } from 'react';
import api from '../api';

function SellerProfile() {
  const [profileData, setProfileData] = useState(null);
  const [companyData, setCompanyData] = useState(null);
  const [postsData, setPostsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const profileResponse = await api.get('/api/users/employee/current/');
        setProfileData(profileResponse.data);

        const companyResponse = await api.get('/api/users/employee/company/');
        setCompanyData(companyResponse.data);

        const postsResponse = await api.get('/api/posts/posts/user-posts/');
        console.log('Posts:', postsResponse.data);
        setPostsData(postsResponse.data);

        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchProfileData();
  }, []);

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

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
        <h1 className="text-2xl font-bold mb-4">Employee Profile</h1>
        {companyData && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">Company Information</h2>
            <p>
              <strong>Company Name:</strong> {companyData.name}
            </p>
            <p>
              <strong>Email:</strong> {companyData.email}
            </p>
            <p>
              <strong>Phone Number:</strong> {companyData.phone_number}
            </p>
            <p>
              <strong>RUT:</strong> {companyData.rut}
            </p>
          </div>
        )}
        {profileData && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">Employee Information</h2>
            <p>
              <strong>Name:</strong> {profileData.name}
            </p>
            <p>
              <strong>Email:</strong> {profileData.email}
            </p>
            <p>
              <strong>Role:</strong> {capitalize(profileData.employee_type)}
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
      {postsData.length > 0 && (
        <div className="mt-10 max-w-3xl mx-auto bg-white p-6 rounded-lg text-indigo-600 shadow-md">
          <h2 className="text-xl font-bold mb-4">User Posts</h2>
          <div className="grid grid-cols-1 gap-4">
            {postsData.map((post) => (
              <div key={post.id} className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-bold mb-2">{post.title}</h3>
                <p>
                  <strong>Creator:</strong> {post.creator}
                </p>
                <p>
                  <strong>Is Sold:</strong> {post.is_sold ? 'Yes' : 'No'}
                </p>
                <p>
                  <strong>Description:</strong> {post.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SellerProfile;
