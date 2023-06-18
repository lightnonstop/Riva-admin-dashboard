import axios from "axios";
import { baseUrl } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";


const getColors = async () => {
    const response = await axios.get(`${baseUrl}color/`);
    
    return response.data;
};
const createColors = async (color: {}) => {
    const response = await axios.post(`${baseUrl}color/`, color, config);
    
    return response.data;
};

const getColor = async (id: {}) => {
    const response = await axios.get(`${baseUrl}color/${id}`, config);
    
    return response.data;
};
const updateColor = async (colorData: { id: string; colorValues: { title: string } }) => {
    const response = await axios.put(`${baseUrl}color/${colorData.id}`, {title: colorData.colorValues.title}, config);
    
    return response.data;
};

const deleteColor = async (id: string) => {
    const response = await axios.delete(`${baseUrl}color/${id}`, config);
    return response.data;
};

const colorService = {
    getColors,
    createColors,
    getColor,
    updateColor,
    deleteColor,
};

export default colorService;