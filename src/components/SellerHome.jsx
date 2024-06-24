import { useState, useEffect } from 'react';
import api from '../api';

const SellerHome = () => {
  const [posts, setPosts] = useState([]);
  const [userRut, setUserRut] = useState(null);

  useEffect(() => {
    fetchPosts();
    fetchUserRut();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await api.get('/api/posts/posts/');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const fetchUserRut = async () => {
    try {
      const profileResponse = await api.get('/api/users/employee/current/');
      setUserRut(profileResponse.data.rut);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  const handleAddSeller = async (postId) => {
    try {
      await api.post(`/api/posts/posts/${postId}/add-seller/`, {});
      fetchPosts();
      fetchUserRut();
    } catch (error) {
      console.error('Error adding seller:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sellers Dashboard</h1>
      <h2 className="text-xl font-semibold mb-4">All Posts</h2>
      <ul className="space-y-4">
        {Array.isArray(posts) ? (
          posts.map((post) => {
            const isPossibleSeller = post.possible_sellers.some(
              (seller) => seller.rut === userRut
            );
            return (
              <li
                key={post.id}
                className="p-4 border border-gray-300 rounded shadow"
              >
                <h3 className="text-lg font-bold">{post.title}</h3>
                <p>{post.description}</p>
                <p className="text-sm text-gray-600">Creator: {post.creator}</p>
                <p className="text-sm text-gray-600">
                  Is Sold: {post.is_sold ? 'Yes' : 'No'}
                </p>
                {post.is_sold && post.chosen_seller && (
                  <p className="text-sm text-gray-600">
                    Chosen Seller: {post.chosen_seller.name} (
                    {post.chosen_seller.rut})
                  </p>
                )}
                <div>
                  <strong>Possible Sellers:</strong>
                  {post.possible_sellers.length > 0 ? (
                    <ul className="list-disc list-inside">
                      {post.possible_sellers.map((seller) => (
                        <li key={seller.id}>
                          {seller.name} ({seller.rut})
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No possible sellers.</p>
                  )}
                </div>
                {!post.is_sold && !isPossibleSeller && (
                  <button
                    onClick={() => handleAddSeller(post.id)}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                  >
                    Add Me as Possible Seller
                  </button>
                )}
              </li>
            );
          })
        ) : (
          <li>No posts available</li>
        )}
      </ul>
    </div>
  );
};

export default SellerHome;
