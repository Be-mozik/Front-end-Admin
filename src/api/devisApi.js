import axios from "axios";

const devisBaseUrl = 'http://localhost:5000/api/devis';

const devisApi = {
    getDevis: async () => {
        try {
            const rep = await axios.get(`${devisBaseUrl}`);
            return rep;
        } catch (error) {
            throw error;
        }
    }
}

export default devisApi;