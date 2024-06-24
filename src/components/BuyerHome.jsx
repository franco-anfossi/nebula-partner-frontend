import { useState, useEffect } from 'react';
import api from '../api';

const BuyerHome = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', description: '' });
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await api.get('/api/posts/posts/current/');
      console.log('Posts:', response.data);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handlePostSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log('Creating post:', newPost);
      const response = await api.post('/api/posts/posts/', newPost);
      console.log('Post created:', response.data);
      setNewPost({ title: '', description: '' }); // Clear form
      fetchPosts(); // Refresh posts after adding a new one
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectSeller = (postId, sellerRut) => {
    setSelectedSeller({ postId, sellerRut });
    setShowConfirmation(true);
  };

  const handleConfirmSelection = async () => {
    try {
      const { postId, sellerRut } = selectedSeller;
      await api.post(`/api/posts/posts/${postId}/choose-seller/`, {
        seller_rut: sellerRut,
      });
      setShowConfirmation(false);
      setSelectedSeller(null);
      fetchPosts(); // Refresh posts after selecting a seller
    } catch (error) {
      console.error('Error selecting seller:', error);
    }
  };

  const handleCancelSelection = () => {
    setShowConfirmation(false);
    setSelectedSeller(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Buyers Dashboard</h1>
      <form onSubmit={handlePostSubmit} className="mb-6">
        <div className="mb-4">
          <input
            type="text"
            name="title"
            value={newPost.title}
            onChange={handleInputChange}
            placeholder="Enter post title"
            required
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <textarea
            name="description"
            value={newPost.description}
            onChange={handleInputChange}
            placeholder="Enter post description"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Create Post
        </button>
      </form>
      <h2 className="text-xl font-semibold mb-4">All Posts</h2>
      <ul className="space-y-4">
        {Array.isArray(posts) ? (
          posts.map((post) => (
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
              {!post.is_sold && (
                <div>
                  <strong>Possible Sellers:</strong>
                  {post.possible_sellers.length > 0 ? (
                    <ul className="list-disc list-inside">
                      {post.possible_sellers.map((seller) => (
                        <li key={seller.id}>
                          <button
                            onClick={() =>
                              handleSelectSeller(post.id, seller.rut)
                            }
                            className="hover:underline text-blue-500"
                          >
                            {seller.name} ({seller.rut})
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No possible sellers.</p>
                  )}
                </div>
              )}
            </li>
          ))
        ) : (
          <li>No posts available</li>
        )}
      </ul>
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl mb-4">Confirm Selection</h2>
            <p>Are you sure you want to choose this seller?</p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={handleConfirmSelection}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
              >
                Yes
              </button>
              <button
                onClick={handleCancelSelection}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyerHome;
