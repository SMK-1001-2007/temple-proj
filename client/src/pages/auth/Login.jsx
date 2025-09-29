import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import "./Login.css";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const res = await axios.post("http://localhost:5000/api/auth/login", formData);
            localStorage.setItem("token", res.data.token);
            console.log("Login Successful!");
            navigate("/home");
        }
        catch(error){
            console.log(error);
        }
    }

    return (
        <div className='login-page'>
        <div className='layout'>
            <div className='signin-box'>
                <form onSubmit={handleSubmit}>
                    <input 
                        type='text'
                        name='email'
                        value={formData.name}
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
                        Login
                    </button>
                </form>
                <p>
                    Don't have an account? {" "}
                    <button onClick={() => navigate("/register")}>Register</button>
                </p>
            </div>
        </div>
        </div>
    )
}

export default Login;
