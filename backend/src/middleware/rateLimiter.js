import ratelimit  from "../config/upstash.js" // Import the rate limiter configuration


const rateLimiter=async(req,res,next)=>{
 try{
    const {success}=await ratelimit.limit("my-limit-key")  //this my llimit kkey we can see in upstash data browser
    // The limit key can be any unique identifier, such as the user's IP address or a
    if(!success){
        return res.status(429).json({
            message:"Too many requests , please try again later "
        })
    }
    next()
 } catch(error){
    console.log("Rate limiter error:", error);
    next(error)
 }
 
}

export default rateLimiter;