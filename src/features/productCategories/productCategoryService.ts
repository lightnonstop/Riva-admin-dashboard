import axios from "axios";
import { baseUrl } from "../../utils/base_url";
import { config } from "../auth/authService";

const getAllProductCategories = async () => {
    const response = await axios.get(`${baseUrl}category-product/`);
    
    return response.data;
};
const createProductCategory = async (category: {}) => {
    const response = await axios.post(`${baseUrl}category-product/`, category, config);
    
    return response.data;
};

const getProductCategory = async (id: {}) => {
    const response = await axios.get(`${baseUrl}category-product/${id}`, config);
    
    return response.data;
};

const updateProductCategory = async (productCategoryData: { id: string; productCategoryValues: { title: string } }) => {
    const response = await axios.put(`${baseUrl}category-product/${productCategoryData.id}`, {title: productCategoryData.productCategoryValues.title}, config);
    
    return response.data;
};

const deleteProductCategory = async (id: string) => {
    const response = await axios.delete(`${baseUrl}category-product/${id}`, config);
    return response.data;
};

const productCategoryService = {
    getAllProductCategories,
    createProductCategory,
    updateProductCategory,
    deleteProductCategory,
    getProductCategory,
};

export default productCategoryService;