import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

function UserForm({ endpoint, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loding, setLoading] = useState(false);

    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();

        try {
            const response = await api.post(endpoint, {
                username,
                password,
            });
            
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, response.data.access);
                localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
                navigate("/");
            } else {
                navigate("/login");
            }
        } catch (error) {
            alert("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    }
    
    return (
        <form onSubmit={ handleSubmit }>
            <h1>{ name }</h1>
            <input 
                className="form-input" 
                type="text"
                value={ username }
                onChange={(event => setUsername(event.target.value))}
                placeholder="Username"
            />

            <input
                className="form-input"
                type="password"
                value={ password }
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
            />
            <button className="form-button" type="submit">
                { name }
            </button>
        </form>
    )
}

export default UserForm;