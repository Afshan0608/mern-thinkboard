import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // Importing CORS middleware to handle cross-origin requests


import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();



const app= express();
const PORT=process.env.PORT || 5001; // Use the PORT from environment variables or default to 5001  

        // connectDB(); // Connect to the MongoDB database using the connectDB function from config/db.js

//middleware we use ..its done for parsing the incoming request body from notescontroller.js

app.use(cors(
    {origin:"http://localhost:5173"} // Allow requests from the specified origin (frontend URL)
)); // Enable CORS for all routes, allowing cross-origin requests

app.use(express.json()); // Middleware to parse JSON request bodies added before defining routes
//this allows us to access req.body in our route handlers right before we send the response
//it will parse the incoming request body and make it available in req.body
//this middleware is necessary for handling JSON data in requests, such as when creating or updating notes
    // app.use((req,res,next)=>{ // Custom middleware to log requests
    //     console.log(`Req method is ${req.method} & Req URL is ${req.url}`); // Log the request method and URL   //it will show in the console/terminal right before we get the response and as soon as we send the response
    //     next(); // Call next() to pass control to the next middleware or route handler
    // });

app.use(rateLimiter); // Apply the rate limiter middleware to all routes

app.use("/api/notes", notesRoutes); // Mounting the notesRoutes on the /api/notes path

// app.get("/api/notes",(req,res)=>{     //creating an api and route
//     res.send("you got 10 notes");
// })

// app.post("/api/notes",(req,res)=>{
//     res.status(201).json({message:"note created successfully"});
// })

// app.put("api/notes/:id",(req,res)=>{
//     res.status(200).json({message:"note updated successfully"});
// })

// app.delete("/api/notes/:id",(req,res)=>{
//     res.status(200).json({message:"note deleted successfully"});
// })

     

        // app.listen(PORT,()=>{
        //     console.log("Server started on port :",PORT);
        // });


        //connect db before starting the server
connectDB().then(()=>{        // Connect to the MongoDB database using the connectDB function from config/db.js
    app.listen(PORT,()=>{
        console.log("Server started on PORT:",PORT);

    });
});

// mongodb+srv://afshanjabeen602:jzcXr4LmzP7Xox7Y@cluster0.eeuzxtv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0