import axios from "axios";
import { baseUrl } from "../../utils/base_url";
import { config } from "../auth/authService";


const getBrands = async () => {
    const response = await axios.get(`${baseUrl}brand/`);
    
    return response.data;
};
const createBrands = async (brand: {}) => {
    const response = await axios.post(`${baseUrl}brand/`, brand, config);
    
    return response.data;
};

const brandService = {
    getBrands,
    createBrands,
};

export default brandService;