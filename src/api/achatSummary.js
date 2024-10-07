import axios from "axios";

const achatSBaseUrl = 'http://localhost:5000/api/achatS';

const achatSApi = {
    getAchatS: async () => {
        try {
            const rep = await axios.get(`${achatSBaseUrl}`);
            return rep;
        } catch (error) {
            throw error;
        }
    },

    getYears: async () => {
        try {
            const rep = await axios.get(`${achatSBaseUrl}/get/Years`);
            return rep;
        } catch (error) {
            throw error;
        }
    }
}

export default achatSApi;