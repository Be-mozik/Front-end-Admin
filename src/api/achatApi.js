import axios from "axios";

const achatBaseUrl = 'http://localhost:5000/api/historique';

const achatApi = {
    getHistoriqueByClient: async (id) => {
        try {
            const achat = await axios.get(`${achatBaseUrl}/${id}`);
            return achat;
        } catch (error) {
            throw error;
        }
    }
}

export default achatApi;