import axios from "axios";
import { baseUrl } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const getOrders = async () => {
    const response = await axios.get(`${baseUrl}user/getallorders/`, config);
    
    return response.data;
};
const getOrder = async (id: string) => {
    const response = await axios.get(`${baseUrl}user/get-order-by-user/${id}`, config);
    
    return response.data;
};

const orderService = {
    getOrders,
    getOrder,
};

export default orderService;