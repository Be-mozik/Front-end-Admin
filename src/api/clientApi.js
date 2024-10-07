import axios from "axios";

const clientBaseUrl = 'http://localhost:5000/api/client';

const clientApi = {
    getClient: async () => {
        try {
            const rep = await axios.get(`${clientBaseUrl}`);
            return rep;
        } catch (error) {
            throw error;
        }
    },
    getClientById: async (id) => {
        try {
            const client = await axios.get(`${clientBaseUrl}/${id}`);
            return client;
        } catch (error) {
            throw error;
        }
    }
}

export default clientApi;