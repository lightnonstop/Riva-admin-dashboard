import axios from "axios";
import { baseUrl } from "../../utils/base_url";
import { config } from "../auth/authService";


const getColors = async () => {
    const response = await axios.get(`${baseUrl}color/`);
    
    return response.data;
};
const createColors = async (color: {}) => {
    const response = await axios.post(`${baseUrl}color/`, color, config);
    
    return response.data;
};

const colorService = {
    getColors,
    createColors,
};

export default colorService;