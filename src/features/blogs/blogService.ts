import axios from "axios";
import { baseUrl } from "../../utils/base_url";
import { config } from "../auth/authService";


const getBlogs = async () => {
    const response = await axios.get(`${baseUrl}blog/`);
    
    return response.data;
};
const createBlogs = async (blog: {}) => {
    const response = await axios.post(`${baseUrl}blog/`, blog, config);
    
    return response.data;
};

const blogService = {
    getBlogs,
    createBlogs,
};

export default blogService;