import { useNavigate } from 'react-router-dom';
import { USER_TYPE } from '../constants';

function Header() {
  const navigate = useNavigate();
  const user_type = localStorage.getItem(USER_TYPE);

  const handleLogout = () => {
    navigate('/logout');
  };

  const handleRegister = () => {
    navigate('/register/employee');
  };

  const handleHome = () => {
    navigate('/');
  };

  const handleUserPage = () => {
    navigate('/profile');
  };

  return (
    <header className="bg-indigo-600 p-4 flex justify-between items-center">
      <div
        className="text-white text-xl font-bold cursor-pointer"
        role="button"
        tabIndex={0}
        onClick={handleHome}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleHome(e);
          }
        }}
      >
        PARTNER
      </div>
      <div className="flex space-x-4">
        {user_type === 'company' && (
          <button
            onClick={handleRegister}
            className="bg-white text-indigo-600 font-bold py-2 px-4 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Register Employee
          </button>
        )}
        <button
          onClick={handleUserPage}
          className="bg-white text-indigo-600 font-bold py-2 px-4 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Profile
        </button>
        <button
          onClick={handleLogout}
          className="bg-white text-indigo-600 font-bold py-2 px-4 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
