import axios from "axios";
import { config } from "../auth/authService";
import { baseUrl } from "../../utils/base_url";

const uploadImages = async (data: any) => {
    const response = await axios.post(`${baseUrl}`, data, config);
    return response.data;
};


const uploadService = {
    uploadImages,
};

export default uploadService;