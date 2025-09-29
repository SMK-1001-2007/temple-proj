import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import "./CancelBooking.css";
import Booking from '../../components/Booking';

const CancelBooking = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const cancelBooking = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }
        try {
            await axios.delete(`http://localhost:5000/api/user/cancel-booking/${id}`, {
                headers: {Authorization: `Bearer ${token}`},
            })
            console.log("Booking cancelled!");
            navigate("/my-bookings");
        }
        catch(error) {
            console.log(error);
        }
    };

    return (
        <div>
            <p>
                Do you wanna cancel this booking?
            </p>
            <button onClick={cancelBooking}>Delete Booking</button>
            <button onClick={() => navigate("/get-my-bookings")}>Cancel</button>
        </div>
    )
}

export default CancelBooking
