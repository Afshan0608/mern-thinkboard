import axios from "axios";

const api=axios.create({   //also called axiosInstance, this creates a new instance of axios with a custom configuration
    baseURL:"http://localhost:5001/api", //baseURL is the base URL for all requests made using this axios instance

});
export default api; //export the axios instance so it can be used in other parts of the application