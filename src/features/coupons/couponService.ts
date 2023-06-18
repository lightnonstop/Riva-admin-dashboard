import axios from "axios";
import { baseUrl } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";


const getCoupons = async () => {
    const response = await axios.get(`${baseUrl}coupon/`, config);
    
    return response.data;
};
const createCoupons = async (coupon: {}) => {
    const response = await axios.post(`${baseUrl}coupon/`, coupon, config);
    
    return response.data;
};

const getCoupon = async (id: {}) => {
    const response = await axios.get(`${baseUrl}coupon/${id}`, config);
    
    return response.data;
};
const updateCoupon = async (couponData: { id: string; couponValues: { name: string; expiry: string; discount: string; } }) => {
    const response = await axios.put(`${baseUrl}coupon/${couponData.id}`, {
        name: couponData.couponValues.name, expiry: couponData.couponValues.expiry, discount: couponData.couponValues.discount
    }, config);
    
    return response.data;
};

const deleteCoupon = async (id: string) => {
    const response = await axios.delete(`${baseUrl}coupon/${id}`, config);
    return response.data;
};

const couponService = {
    getCoupons,
    createCoupons,
    getCoupon,
    updateCoupon,
    deleteCoupon,
};

export default couponService;