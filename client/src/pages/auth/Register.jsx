import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import "./Register.css";

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/auth/register", formData);
            console.log("Registration successful!");
            navigate("/login")
        }
        catch(error) {
            console.log(error);
        }
    }

    return (
        <div className='register-page'>
        <div className='layout'>
            <div className='signup-box'>
                <form onSubmit={handleSubmit}>
                    <input 
                        type='text'
                        name='name'
                        value={formData.name}
                        placeholder='Name'
                        onChange={handleChange}
                        required
                    />
                    <input 
                        type='email'
                        name='email'
                        value={formData.email}
                        placeholder='Email'
                        onChange={handleChange}
                        required
                    />
                    <input 
                        type='password'
                        name='password'
                        value={formData.password}
                        placeholder='Password'
                        onChange={handleChange}
                        required
                    />
                    <button type='submit'>
                        Register
                    </button>
                </form>
                <p>
                    Already have an account? {" "}
                    <button onClick={() => navigate("/login")}>Login</button>
                </p>
            </div>            
        </div>
        </div>
    )
}

export default Register;