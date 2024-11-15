import axios from "axios";

const achatBaseUrl = 'http://localhost:5000/api/achat';
const tokenClient = localStorage.getItem('tokenClient');
const achatApi = {
    getHistoriqueByClient: async (id) => {
        try {
            const achat = await axios.get(`${achatBaseUrl}/${id}`);
            return achat;
        } catch (error) {
            throw error;
        }
    },
    achatBillet: async (data) =>{
        try {
            const achat = await axios.post(`${achatBaseUrl}/acheter`, data, {
                headers: {
                    Authorization: `Bearer ${tokenClient}`
                },
                responseType: 'blob',
            });
            return achat;            
        } catch (error) {
            throw error;
        }
   
    }
}

export default achatApi;