import axios from "axios";
import { baseUrl } from "../../utils/base_url";
import { config } from "../auth/authService";

const getOrders = async () => {
    const response = await axios.get(`${baseUrl}user/getallorders/`, config);
    
    return response.data;
};


const orderService = {
    getOrders,
};

export default orderService;