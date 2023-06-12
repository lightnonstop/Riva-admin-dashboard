import axios from "axios";
import { baseUrl } from "../../utils/base_url";


const getAllUsers = async () => {
    const response = await axios.get(`${baseUrl}user/all-users`);
    
    return response.data;
};


const customerService = {
    getAllUsers,
};

export default customerService;