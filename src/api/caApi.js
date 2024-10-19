import axios from "axios";

const caBaseUrl = 'http://localhost:5000/api/ca';

const caApi = {
    getCaSummary: async () => {
        try {
            const rep = await axios.get(`${caBaseUrl}`);
            return rep;
        } catch (error) {
            throw error;
        }
    },

    getStatByEvent: async (idevent) => {
        try {
            const rep = await axios.get(`${caBaseUrl}/stat/${idevent}`);
            return rep;
        } catch (error) {
            throw error
        }
    },

    getStatByEventBillet: async (idevent) => {
        try {
            const rep = await axios.get(`${caBaseUrl}/stat/billet/${idevent}`);
            return rep;
        } catch (error) {
            throw error;
        }
    }
}

export default caApi;