import axios from "axios";
import { config } from "../auth/authService";
import { baseUrl } from "../../utils/base_url";

const uploadImages = async (data: any) => {
    const response = await axios.post(`${baseUrl}upload`, data, config);
    return response.data;
};

const deleteImages = async (id: string) => {
    const response = await axios.delete(`${baseUrl}upload/delete-img/${id}`, config);
    return response.data;
};

const uploadService = {
    uploadImages,
    deleteImages,
};

export default uploadService;