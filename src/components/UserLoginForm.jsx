import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

function UserLoginForm({ endpoint }) {
    const [rut, setRut] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();

        try {
            const response = await api.post(endpoint, {
                username: rut,
                password,
            });
            
            localStorage.setItem(ACCESS_TOKEN, response.data.access);
            localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
            navigate("/"); // Navegar a la página principal después del login
        } catch (error) {
            alert("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <input 
                className="form-input" 
                type="text"
                value={rut}
                onChange={(event => setRut(event.target.value))}
                placeholder="Rut"
            />
            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
            />
            <button className="form-button" type="submit" disabled={loading}>
                Login
            </button>
        </form>
    )
}

export default UserLoginForm;
