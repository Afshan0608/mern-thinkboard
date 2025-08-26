import axios from "axios";

//in production there is no localhost so we have to make this dynamic
const BASE_URL=import.meta.env.MODE==="development"?"http://localhost:5001/api":"/api"; // Set the base URL based on the environment
//if we are in development mode use localhost else use /api for production

const api=axios.create({   //also called axiosInstance, this creates a new instance of axios with a custom configuration
    baseURL: BASE_URL   ,  //"http://localhost:5001/api", //baseURL is the base URL for all requests made using this axios instance

});
export default api; //export the axios instance so it can be used in other parts of the application