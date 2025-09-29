import express from "express";
import { register, login, getMyInfo, createBooking, editBooking, cancelBooking, getMyBookings, getBooking } from "./api.js";
import { protect } from "./middleware.js";

const router = express.Router();

// Auth Routes
router.post("/auth/register", register);
router.post("/auth/login", login);

// User Routes
router.get("/user/profile", protect, getMyInfo);
router.post("/user/create-booking", protect, createBooking);
router.get("/user/mybookings", protect, getMyBookings);
router.patch("/user/edit-booking/:bookingId", protect, editBooking);
router.delete("/user/cancel-booking/:bookingId", protect, cancelBooking);
router.get("/user/mybooking/:bookingId", protect, getBooking);

export default router;