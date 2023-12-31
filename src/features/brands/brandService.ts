import axios from "axios";
import { baseUrl } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";


const getBrands = async () => {
    const response = await axios.get(`${baseUrl}brand/`, config);
    
    return response.data;
};
const createBrands = async (brand: {}) => {
    const response = await axios.post(`${baseUrl}brand/`, brand, config);
    
    return response.data;
};
const getBrand = async (id: string) => {
    const response = await axios.get(`${baseUrl}brand/${id}`, config);
    
    return response.data;
};
const updateBrand = async (brandData: { id: string; brandValues: { title: string } }) => {
    const response = await axios.put(`${baseUrl}brand/${brandData.id}`, {title: brandData.brandValues.title}, config);
    
    return response.data;
};

const deleteBrand = async (id: string) => {
    const response = await axios.delete(`${baseUrl}brand/${id}`, config);
    return response.data;
};

const brandService = {
    getBrands,
    createBrands,
    getBrand,
    updateBrand,
    deleteBrand,
};

export default brandService;