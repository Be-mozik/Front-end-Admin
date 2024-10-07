import axios from "axios";

const eventSBaseUrl = 'http://localhost:5000/api/eventS';

const eventSApi = {
    getEventS: async () => {
        try {
            const rep = await axios.get(`${eventSBaseUrl}`);
            return rep;
        } catch (error) {
            throw error;
        }
    },

    getEventStat: async (year) => {
        try {
            const rep = await axios.get(`${eventSBaseUrl}/${year}`);
            return rep;
        } catch (error) {
            throw error;
        }
    },

    getYears: async () => {
        try {
            const rep = await axios.get(`${eventSBaseUrl}/get/year`);
            return rep;
        } catch (error) {
            throw error;
        }
    }
}

export default eventSApi;