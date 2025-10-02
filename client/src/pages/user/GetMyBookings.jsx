import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./GetMyBookings.css";
import { useNavigate } from 'react-router-dom';
import Booking from '../../components/Booking';

const GetMyBookings = () => {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        const getBookings = async () => {
            const token = localStorage.getItem("token");
            if(!token){
                navigate("/login");
                return;
            }
            try {
                const res = await axios.get("http://localhost:5000/api/user/mybookings", {
                    headers: {Authorization: `Bearer ${token}`},
                });
                setBookings(res.data.bookings);
            }
            catch(error) {
                console.log(error);
            }
        };

        getBookings();
    }, [navigate]);

    return (
        <div className='bookings-page'>
            <div className='layout'>
                <div className='bookings'>
                {
                    bookings.length == 0 ? (
                        <p>You haven't booked any tickets yet.</p>
                    )
                    :
                    (
                        bookings.map((booking) => (
                            <Booking key = {booking.id} booking = {booking} />
                        ))
                    )

                }
                </div>
                <button onClick={() => navigate("/home")}>Home</button>
            </div>
        </div>
    )
}

export default GetMyBookings