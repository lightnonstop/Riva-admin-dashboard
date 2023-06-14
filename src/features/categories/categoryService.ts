import axios from "axios";
import { baseUrl } from "../../utils/base_url";
import { config } from "../auth/authService";

const getCategories = async () => {
    const response = await axios.get(`${baseUrl}category-product/`);
    
    return response.data;
};
const createCategories = async (category: {}) => {
    const response = await axios.post(`${baseUrl}category-product/`, category, config);
    
    return response.data;
};

const categoryService = {
    getCategories,
    createCategories,
};

export default categoryService;