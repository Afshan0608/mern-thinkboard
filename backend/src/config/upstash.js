import {Ratelimit} from "@upstash/ratelimit";
import {Redis} from "@upstash/redis";

import dotenv from "dotenv";  
 dotenv.config(); // Load environment variables from .env file
 
 //create a rate limiter that allows 5 requests per 10 seconds per IP address
 const ratelimit=new Ratelimit({   // Create a new rate limiter instance
    redis:Redis.fromEnv(), // Connect to Upstash Redis using environment variables
    limiter:Ratelimit.slidingWindow(100,"60 s"), // Define the rate limit: 10 requests per 20 seconds
 });
export default ratelimit; // Export the rate limiter instance for use in other parts of the application