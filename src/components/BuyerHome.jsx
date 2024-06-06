import { useState, useEffect } from 'react';
import api from '../api';

const BuyerHome = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', description: '' });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await api.get('/api/posts/posts/');
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
      setNewPost({ title: '', description: '' });
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
                  Chosen Seller: {post.chosen_seller}
                </p>
              )}
            </li>
          ))
        ) : (
          <li>No posts available</li>
        )}
      </ul>
    </div>
  );
};

export default BuyerHome;
