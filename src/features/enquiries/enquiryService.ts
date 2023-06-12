import axios from "axios";
import { baseUrl } from "../../utils/base_url";


const getEnquiries = async () => {
    const response = await axios.get(`${baseUrl}enquiry/`);
    
    return response.data;
};


const enquiryService = {
    getEnquiries,
};

export default enquiryService;