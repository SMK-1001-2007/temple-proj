import React from 'react';
import "./Booking.css";
import { useNavigate } from 'react-router-dom';

const Booking = ({ booking }) => {
    const navigate = useNavigate();

    return (
        <div>
            <p>Devotee name: {booking.devotee_name}</p>
            <p>Nakshatra: {booking.nakshatra}</p>
            <p>Rasi: {booking.rasi}</p>
            <p>Gothram: {booking.gothram}</p>
            <p>Date of Archanai: {booking.date}</p>

            <button onClick={() => navigate(`/edit-booking/${booking.id}`)}>Edit Booking</button>
            <button onClick={() => navigate(`/cancel-booking/${booking.id}`)}>Delete Booking</button>
        </div>
    )
}

export default Booking
