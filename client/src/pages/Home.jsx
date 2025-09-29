import React from 'react';
import "./Home.css";
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const navigate = useNavigate();
    return (
        <div className='home-page'>
            <div className='navbar'>
                <button onClick={() => navigate("/create-booking")}>Services</button>
                <button>About</button>
                <button onClick={() => navigate("/profile")}>Profile</button>
            </div>
            <div>
                <button onClick={() => navigate("/my-bookings")}>Show Bookings</button>
            </div>
        </div>
    )
}

export default Home
