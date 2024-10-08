import axios from "axios";

const billetBaseUrl = 'http://localhost:5000/api/billet';

const billetApi = {
    getBilletByEvent: async (id) => {
        try {
            const rep = await axios.get(`${billetBaseUrl}/event/${id}`);
            return rep;
        } catch (error) {
            throw error;
        }
    },

    deleteBillet: async (id) => {
        try {
            const rep = await axios.delete(`${billetBaseUrl}/supprimer/${id}`);
            return rep;
        } catch (error) {
            throw error;
        }
    }
}

export default billetApi;