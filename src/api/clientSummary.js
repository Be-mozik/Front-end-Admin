import axios from "axios";

// const clientSBaseUrl = 'https://back-end-wxii.onrender.com/api/clientS';
const clientSBaseUrl = 'http://localhost:5000/api/clientS';


const clientSApi = {

    getClientS: async () => {
        try {
            const rep = await axios.get(`${clientSBaseUrl}`);
            return rep;
        } catch (error) {
            throw error;
        }
    }
}

export default clientSApi;