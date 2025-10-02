import React from 'react';
import "./Home.css";
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const navigate = useNavigate();


    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }
    const token = localStorage.getItem("token");
    return (
        <div className='home-page'>
            <div className='navbar'>
                <button onClick={() => navigate("/create-booking")}>Services</button>
                <button>About</button>
                <button onClick={() => navigate("/profile")}>Profile</button>
            { 
                token != null ? (
                    <button onClick={() => navigate("/my-bookings")}>Show Bookings</button>
                ) :
                (
                    <div></div>
                )
            }

            { 
                token != null ? (
                    <button onClick={logout}>Logout</button>
                ) :
                (
                    <div></div>
                )
            }
            </div>
        </div>
    )
}

export default Home
