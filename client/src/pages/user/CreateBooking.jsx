import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./CreateBooking.css";

const CreateBooking = () => {
    const navigate = useNavigate();
    const [bookingData, setBookingData] = useState({ 
        devotee_name: "", nakshatra: "", rasi: "", gothram: "", date: ""
    });

    const handleChange = (e) => {
        setBookingData({ ...bookingData, [e.target.name]: e.target.value });
    }

    const handleCreate = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }
        try {
            console.log(bookingData);
            await axios.post("http://localhost:5000/api/user/create-booking",bookingData, {
                headers: { Authorization: `Bearer ${token}`}
            });
            console.log("Booking created successfully!");
            navigate("/home")
        }
        catch(error) {
            console.log(error);
        }
    }

    return (
        <div className='create-booking-page'>
        <div className='layout'>
            <div className='create-booking-box'>
                <form onSubmit={handleCreate}>
                    <input 
                        type='text'
                        name='devotee_name'
                        value={bookingData.devotee_name}
                        placeholder='Devotee Name'
                        onChange={handleChange}
                        required
                    />
                    <input 
                        type='text'
                        name='nakshatra'
                        value={bookingData.nakshatra}
                        placeholder='Nakshatram'
                        onChange={handleChange}
                        required
                    />
                    <input 
                        type='text'
                        name='rasi'
                        value={bookingData.rasi}
                        placeholder='Rasi'
                        onChange={handleChange}
                        required
                    />
                    <input 
                        type='text'
                        name='gothram'
                        value={bookingData.gothram}
                        placeholder='Gothram'
                        onChange={handleChange}
                        required
                    />
                    <input 
                        type='date'
                        name='date'
                        value={bookingData.date}
                        placeholder='Date'
                        onChange={handleChange}
                        required
                    />
                    <button type='submit'>
                        Create Booking
                    </button> 
                </form>
                <button onClick={() => navigate("/home")}>Cancel</button>
            </div>
        </div>
        </div>
    )
}

export default CreateBooking
