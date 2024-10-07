import axios from "axios";

const graphBaseUrl = 'http://localhost:5000/api/achatS/';

const graphApi = {
    
    getDataGraph1: async (year) => {
        try {
            const rep = await axios.get(`${graphBaseUrl}/${year}`);
            return rep;
        } catch (error) {
            throw error;
        }
    }
}

export default graphApi;