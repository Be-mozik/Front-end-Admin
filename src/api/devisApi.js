import axios from "axios";

// const devisBaseUrl = 'https://back-end-wxii.onrender.com/api/devis';
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