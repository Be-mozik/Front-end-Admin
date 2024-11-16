import axios from "axios";

const achatSBaseUrl = 'https://back-end-wxii.onrender.com/api/achatS';

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