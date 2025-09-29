import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Profile.css";

const Profile = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({ name: "", email: ""})
    useEffect(() => {
        const getProfile = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }
            try {
                const res = await axios.get("http://localhost:5000/api/user/profile", {
                    headers: {Authorization: `Bearer ${token}`},
                });
                setUserData(res.data);
            }
            catch(error) {
                console.log(error);
            }
        };

        getProfile();
    }, [navigate]);

    return (
        <div>
            <p>
                name: {userData.name} <br />
                email: {userData.email} <br />

                <button onClick={() => navigate("/home")}>Home</button>
            </p>
        </div>
    )
}

export default Profile