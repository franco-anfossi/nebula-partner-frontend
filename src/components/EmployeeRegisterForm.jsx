import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; 

function EmployeeRegisterForm({ endpoint }) {
    const [rut, setRut] = useState("");
    const [name, setName] = useState("");
    const [phone_number, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [employeeType, setEmployeeType] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();

        try {
            console.log(rut, name, phone_number, email, password, employeeType);
            await api.post(endpoint, {
                rut,
                name,
                phone_number,
                email,
                password,
                employee_type: employeeType,
            });
            navigate("/"); // Redirige al usuario a la página de inicio de sesión después del registro
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Register</h1>
            <input 
                className="form-input" 
                type="text"
                value={rut}
                onChange={(event) => setRut(event.target.value)}
                placeholder="Rut" required
            />
            <input
                className="form-input"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Name" required
            />
            <input
                className="form-input"
                type="text"
                value={phone_number}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="Phone" required
            />
            <input
                className="form-input"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email" required
            />
            <select
                className="form-input"
                value={employeeType}
                onChange={(event) => setEmployeeType(event.target.value)}
                required
            >
                <option value="">Select Role</option>
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
            </select>
            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password" required
            />
            <button className="form-button" type="submit" disabled={loading}>
                Register
            </button>
        </form>
    )
}

export default EmployeeRegisterForm;
