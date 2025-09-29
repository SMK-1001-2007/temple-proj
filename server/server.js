import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes.js"

// Allows the loading of variables from .env file
dotenv.config();
const app = express();
const port  = process.env.PORT || 5001;

// Parses incoming json - converts all the request data in json format 
app.use(express.json());

// Allows cross origin resource sharing since browsers requests from one origin to another
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}));

// Router extension
app.use("/api", routes);

// Starting the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});