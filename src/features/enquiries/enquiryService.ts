import axios from "axios";
import { baseUrl } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const getEnquiries = async () => {
    const response = await axios.get(`${baseUrl}enquiry/`);
    
    return response.data;
};
const deleteEnquiry = async (id: string) => {
    const response = await axios.delete(`${baseUrl}enquiry/${id}`, config);
    return response.data;
};
const getEnquiry = async (id: string) => {
    const response = await axios.get(`${baseUrl}enquiry/${id}`, config);
    
    return response.data;
};
const updateEnquiry = async (enquiryData: { id: string; enquiryValues: string }) => {
    const response = await axios.put(`${baseUrl}enquiry/${enquiryData.id}`, {status: enquiryData.enquiryValues}, config);

    return response.data;
};

const enquiryService = {
    getEnquiries,
    deleteEnquiry,
    getEnquiry,
    updateEnquiry,
};

export default enquiryService;