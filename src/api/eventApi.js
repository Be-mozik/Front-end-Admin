import axios from "axios";

const eventBaseUrl = 'http://localhost:5000/api/event';

const eventApi = {
    creerEvent: async (data) =>{
        try {
            const rep = await axios.post(`${eventBaseUrl}/creerEvent`,data);
            return rep.data;
        } catch (error) {
            throw error;
        }
    },

    getEvents: async () => {
        try {
            const rep = await axios.get(`${eventBaseUrl}`);
            return rep;
        } catch (error) {
            throw(error);
        }
    },

    getEventById: async (id) => {
        try {
            const rep = await axios.get(`${eventBaseUrl}/${id}`);
            return rep;
        } catch (error) {
            throw error;
        }
    },

    annulerEvent: async (id) => {
        try {
            const rep = await axios.put(`${eventBaseUrl}/annuler/${id}`);
            return rep;
        } catch (error) {
            throw error;
        }
    }
}

export default eventApi;