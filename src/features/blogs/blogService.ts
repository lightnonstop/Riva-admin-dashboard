import axios from "axios";
import { baseUrl } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";


const getBlogs = async () => {
    const response = await axios.get(`${baseUrl}blog/`);
    
    return response.data;
};
const createBlogs = async (blog: {}) => {
    const response = await axios.post(`${baseUrl}blog/`, blog, config);
    
    return response.data;
};
const getBlog = async (id: {}) => {
    const response = await axios.get(`${baseUrl}blog/${id}`, config);
    
    return response.data;
};
const updateBlog = async (blogData: { id: string; blogValues: { title: string; description: string; category: string; images: never[]; } }) => {
    const response = await axios.put(`${baseUrl}blog/${blogData.id}`, {
        title: blogData.blogValues.title,
        category: blogData.blogValues.category,
        description: blogData.blogValues.description,
        images: blogData.blogValues.images
    }, config);
    
    return response.data;
};

const deleteBlog = async (id: string) => {
    const response = await axios.delete(`${baseUrl}blog/${id}`, config);
    return response.data;
};
const blogService = {
    getBlogs,
    createBlogs,
    getBlog,
    updateBlog,
    deleteBlog,
};

export default blogService;