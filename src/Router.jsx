import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import RegisterCompany from './pages/RegisterCompany';
import RegisterEmployee from './pages/RegisterEmployee';

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogoutCompany() {
  localStorage.clear();
  return <RegisterCompany />;
}

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              {' '}
              <Home />{' '}
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterAndLogoutCompany />} />
        <Route
          path="/register/employee"
          element={
            <ProtectedRoute>
              <RegisterEmployee />
            </ProtectedRoute>
          }
        />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
