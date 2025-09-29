import pool from "./db.js"
import { comparePassword, generateToken, hashPassword } from "./utils.js";

// Auth API
export const register = async (req, res) => {
    try { 
        const { name, email, password } = req.body;
        const hashedPassword = await hashPassword(password);

        const result = await pool.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, hashedPassword]
        );

        res.status(200).json({
            message: "User registered successfully",
            user: result.rows[0],
        })
    } 
    catch(error) {
        console.error(error.message);
    }   
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // result returns a big object containing various stuff like the cmd, rowcount, rows,
        // fields, etc, result.rows returns a list of objects where each object is the affected
        // row, we usually use result.rows[0] as it is the row which is queryed/affected.
        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1", [email]
        );
        const match = await comparePassword(password, result.rows[0].password);
        if (!match) 
            return res.status(401).json({ error: "Invalid Credentials" });

        res.status(200).json({
            message: "User logged in successfully",
            token: generateToken(result.rows[0].id),
            user: {
                id: result.rows[0].id,
                name: result.rows[0].name,
                email: result.rows[0].email,
            },
        });
    }
    catch(error) {
        console.error(error.message);
    }
}

// User API
export const getMyInfo = async (req, res) => {
    try {
        // Get userId from user data attached to the req by middleware
        const userId = req.user.id;

        const result = await pool.query("SELECT name, email FROM users WHERE id = $1", [userId]);

        res.json(result.rows[0]);
    }
    catch(error) {
        console.log(error.message); 
    }
}

export const createBooking = async (req, res) => {
    try {
        // Get userId from user data attached to the req by middleware
        const userId = req.user.id;
        const {
            devotee_name,
            nakshatra,
            rasi, 
            gothram,
            date,
        } = req.body;

        const result = await pool.query(
            "INSERT INTO archana_bookings (user_id, devotee_name, nakshatra, rasi, gothram, date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [userId, devotee_name, nakshatra, rasi, gothram, date]
        );

        res.status(200).json({
            message: "Booking created successfully!",
            booking: result.rows[0],
        });
    }
    catch(error) {
        console.error(error.message);
    }
}

export const getMyBookings = async (req, res) => {
    try {
        const userId = req.user.id;

        const result = await pool.query(
            "SELECT * FROM archana_bookings WHERE user_id = $1", [userId]
        );

        res.status(200).json({
            message: "Here's your bookings!",
            bookings: result.rows,
        });
    }
    catch(error) {
        console.error(error.message);
    }
}

export const editBooking = async (req, res) => {
    try {
        const { bookingId } = req.params;
        // We don't destructure the body, we get it as an object
        const edits = req.body;

        // Extract field and values into 2 separate arrays
        const fields = Object.keys(edits);
        const values = Object.values(edits);
        // Add the bookingId given as parameter into the values array for dynamic query
        values.unshift(bookingId);

        // Build the dynamic edit by looping thru each field mentioned and creating field = $x
        // for each field. NOTE: x begins from 2 onwards as we have reserved 1 for bookingId
        let dynamicEdit = ``;
        fields.forEach((field, index) => {
            if(index == fields.length - 1)
                dynamicEdit += `${field} = $${index+2}`;
            else
                dynamicEdit += `${field} = $${index+2}, `;
        });

        // Build the dynamic query by combining the query statement and the edit
        const query = "UPDATE archana_bookings SET " + dynamicEdit + " WHERE id = $1 RETURNING *";
        const result = await pool.query(query, values);

        res.status(200).json({
            message: "Booking edited successfully!",
            booking: result.rows[0],
        });
    }
    catch(error) { 
        console.error(error.message);
    }
}

export const cancelBooking = async (req, res) => {
    try {
        const { bookingId } = req.params;

        const result = await pool.query(
            "DELETE FROM archana_bookings WHERE id = $1 RETURNING *", [bookingId]
        );
        
        if (result.rowCount == 0)
            return res.status(404).json("Booking not found!");

        // The response will hold the deleted booking of the user, we can change it up later 
        // to something else based on the frontend
        res.status(200).json({
            message: "Booking cancelled successfully!",
            bookings: result.rows[0],
        });
    }
    catch(error) {
        console.error(error.message);
    }
}

export const getBooking = async (req, res) => {
    try {
        const {bookingId} = req.params;

        const result = await pool.query(
            "SELECT * FROM archana_bookings WHERE id = $1", [bookingId]
        );

        res.status(200).json({
            message: "Fetched booking successfully!",
            booking: result.rows[0],
        });
    }
    catch(error) {
        console.error(error.message);
    }
}
