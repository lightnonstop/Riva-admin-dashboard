import axios from "axios";
import { baseUrl } from "../../utils/base_url";
import { config } from "../auth/authService";

const getAllBlogCategories = async () => {
    const response = await axios.get(`${baseUrl}category-blog/`);
    
    return response.data;
};
const createABlogCategory = async (category: {}) => {
    const response = await axios.post(`${baseUrl}category-blog/`, category, config);
    
    return response.data;
};

const blogCategoryService = {
    getAllBlogCategories,
    createABlogCategory,
};

export default blogCategoryService;