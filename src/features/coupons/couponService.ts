import axios from "axios";
import { baseUrl } from "../../utils/base_url";
import { config } from "../auth/authService";


const getCoupons = async () => {
    const response = await axios.get(`${baseUrl}coupon/`, config);
    
    return response.data;
};
const createCoupons = async (coupon: {}) => {
    const response = await axios.post(`${baseUrl}coupon/`, coupon, config);
    
    return response.data;
};

const couponService = {
    getCoupons,
    createCoupons,
};

export default couponService;