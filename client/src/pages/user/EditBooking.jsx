import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import "./EditBooking.css";
import { useNavigate, useParams } from 'react-router-dom';

const EditBooking = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [bookingData, setBookingData] = useState(
        {devotee_name: "", nakshatra: "", rasi: "", gothram: "", date: ""}
    );

    const handleChange = (e) => {
        setBookingData({ ...bookingData, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        const getBooking = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }
            try {
                const res = await axios.get(`http://localhost:5000/api/user/mybooking/${id}`, {
                    headers: {Authorization: `Bearer ${token}`},
                });
                setBookingData(res.data.booking);
            }
            catch(error) {
                console.log(error);
            }
        };
        getBooking();
    }, [navigate, id]);

    
    const editBooking = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }
        try {
            await axios.patch(`http://localhost:5000/api/user/edit-booking/${id}`, 
                bookingData, { headers: { Authorization: `Bearer ${token}`}
            })
            console.log("Edited booking");
            navigate("/my-bookings");
        }
        catch(error) {
            console.log(error);
        }
    }

    return (
        <div className='edit-booking-page'>
        <div className='layout'>
            <div className='edit-booking-box'>
                <form onSubmit={editBooking}>
                    <input 
                        type='text'
                        name='devotee_name'
                        value={bookingData.devotee_name}
                        placeholder='Devotee Name'
                        onChange={handleChange}
                    />
                    <input 
                        type='text'
                        name='nakshatra'
                        value={bookingData.nakshatra}
                        placeholder='Nakshatram'
                        onChange={handleChange}
                    />
                    <input 
                        type='text'
                        name='rasi'
                        value={bookingData.rasi}
                        placeholder='Rasi'
                        onChange={handleChange}
                    />
                    <input 
                        type='text'
                        name='gothram'
                        value={bookingData.gothram}
                        placeholder='Gothram'
                        onChange={handleChange}
                    />
                    <input 
                        type='date'
                        name='date'
                        value={bookingData.date}
                        placeholder='Date'
                        onChange={handleChange}
                    />
                    <button type='submit'>
                        Edit Booking
                    </button> 
                </form>
            </div>
            <button onClick={() => navigate("/my-bookings")}>Cancel</button>
        </div>
        </div>
    )
}

export default EditBooking
