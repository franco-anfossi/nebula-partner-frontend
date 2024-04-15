import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

function UserForm({ endpoint, method }) {
    const [rut, setRut] = useState("");
    const [name, setName] = useState("");
    const [phone_number, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const names = method === "login" ? "Login" : "Register";

    const handleSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();

        try {
            const response = await api.post(endpoint, {
                rut,
                name,
                phone_number,
                email,
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
            <h1>{ names }</h1>
            <input 
                className="form-input" 
                type="text"
                value={ rut }
                onChange={(event => setRut(event.target.value))}
                placeholder="Rut"
            />

            { method === "register" && (
                <>
                    <input
                        className="form-input"
                        type="text"
                        value={ name }
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Name"
                    />
                    <input
                        className="form-input"
                        type="text"
                        value={ phone_number }
                        onChange={(event) => setPhone(event.target.value)}
                        placeholder="Phone"
                    />

                    <input
                        className="form-input"
                        type="email"
                        value={ email }
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Email"
                    />
                </>
            )}

            <input
                className="form-input"
                type="password"
                value={ password }
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
            />
            <button className="form-button" type="submit">
                { names }
            </button>
        </form>
    )
}

export default UserForm;