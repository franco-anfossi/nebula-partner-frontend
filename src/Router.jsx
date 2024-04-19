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

function RegisterAndLogoutEmployee() {
    localStorage.clear();
    return <RegisterEmployee />;
}

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <ProtectedRoute> <Home /> </ProtectedRoute>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<RegisterAndLogoutCompany />} />
                <Route path="/register/employee" element={<RegisterAndLogoutEmployee />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/logout" element={<Logout />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;