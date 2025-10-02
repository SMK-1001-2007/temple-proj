import React from 'react';
import "./Booking.css";
import { useNavigate } from 'react-router-dom';

const Booking = ({ booking }) => {
    const navigate = useNavigate();

    return (
        <div className='booking'>
            <div className='info'>
                <p>Devotee name: {booking.devotee_name}</p>
                <p>Nakshatra: {booking.nakshatra}</p>
                <p>Rasi: {booking.rasi}</p>
                <p>Gothram: {booking.gothram}</p>
                <p>Date of Archanai: {booking.date}</p>
            </div>
            <div className='buttons'>
                <button onClick={() => navigate(`/edit-booking/${booking.id}`)}>Edit Booking</button>
                <button onClick={() => navigate(`/cancel-booking/${booking.id}`)}>Delete Booking</button>
            </div>
        </div>
    )
}

export default Booking
