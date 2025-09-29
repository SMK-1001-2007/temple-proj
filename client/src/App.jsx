import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import Profile from "./pages/user/Profile";
import CreateBooking from "./pages/user/CreateBooking";
import GetMyBookings from "./pages/user/GetMyBookings";
import CancelBooking from "./pages/user/CancelBooking";
import EditBooking from "./pages/user/EditBooking";

const App = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/register" element = {<Register/>} />
          <Route path="/login" element = {<Login/>} />

          <Route path="/home" element = {<Home/>} />

          <Route path="/profile" element = {<Profile/>} />
          <Route path="/create-booking" element = {<CreateBooking/>} />
          <Route path="/my-bookings" element = {<GetMyBookings/>} />
          <Route path="/edit-booking/:id" element = {<EditBooking/>} />
          <Route path="/cancel-booking/:id" element = {<CancelBooking/>} />
        </Routes>
      </BrowserRouter> 
  )
}

export default App
