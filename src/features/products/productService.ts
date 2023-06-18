import axios from "axios";
import { baseUrl } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";


const getProducts = async () => {
    const response = await axios.get(`${baseUrl}product/`);
    
    return response.data;
};

const createProducts = async (product: {}) => {
    const response = await axios.post(`${baseUrl}product/`, product, config);
    
    return response.data;
};

const productService = {
    getProducts,
    createProducts,
};

export default productService;