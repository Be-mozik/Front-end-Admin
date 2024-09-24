import axios from "axios";

const infoBaseUrl = 'http://localhost:5000/api/info';

const infoApi = {
    getInfoByEvent: async (id) => {
        try {
            const rep = await axios.get(`${infoBaseUrl}/event/${id}`);
            return rep;
        } catch (error) {
            throw error
        }
    }
}

export default infoApi;