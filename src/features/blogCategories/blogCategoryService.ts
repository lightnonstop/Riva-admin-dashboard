import axios from "axios";
import { baseUrl } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const getAllBlogCategories = async () => {
    const response = await axios.get(`${baseUrl}category-blog/`);
    
    return response.data;
};
const createABlogCategory = async (category: {}) => {
    const response = await axios.post(`${baseUrl}category-blog/`, category, config);
    
    return response.data;
};
const getblogCategory = async (id: {}) => {
    const response = await axios.get(`${baseUrl}category-blog/${id}`, config);
    
    return response.data;
};
const updateblogCategory = async (blogCategoryData: { id: string; blogCategoryValues: { title: string } }) => {
    const response = await axios.put(`${baseUrl}category-blog/${blogCategoryData.id}`, {title: blogCategoryData.blogCategoryValues.title}, config);
    
    return response.data;
};

const deleteblogCategory = async (id: string) => {
    const response = await axios.delete(`${baseUrl}category-blog/${id}`, config);
    return response.data;
};

const blogCategoryService = {
    getAllBlogCategories,
    createABlogCategory,
    getblogCategory,
    updateblogCategory,
    deleteblogCategory,
};

export default blogCategoryService;