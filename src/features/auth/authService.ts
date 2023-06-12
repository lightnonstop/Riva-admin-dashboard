import axios from "axios";
import { baseUrl } from "../../utils/base_url";
const getTokenFromLocalStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;

export const config = {
    headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage.token}`,
        Accept: 'application/json',
    },
}
const login = async (userData: {}) => {
    const response = await axios.post(`${baseUrl}user/admin-login`, userData);
    if (response.data){
        localStorage.setItem('user', JSON.stringify(response.data));        
    }
    return response.data;
};

const authService = {
    login,
};

export default authService;