import axios from "axios";
import {jwtDecode} from "jwt-decode";

// const clientBaseUrl = 'https://back-end-wxii.onrender.com/api/client';
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
    },
    addClientFormulaire: async (data) => {
        try {
            const client = await axios.post(`${clientBaseUrl}/ajouterClient`,data);
            return client;
        } catch (error) {
            throw error;
        }
    },
    loginClient: async (data) => {
        try {
            const client = await axios.post(`${clientBaseUrl}/connexion`,data);
            return client.data;
        } catch (error) {
            throw error;
        }
    },
    deconnexionClient: async () => {
        try {
            localStorage.removeItem('tokenClient');
            localStorage.removeItem('cart');
        } catch (error) {
            console.error('Erreur lors de la deconnexion: ',error);
        }
    },
    getProfileClient: async (data) => {
        try {
            const token = localStorage.getItem(data);
            if(token){
                const decodes = jwtDecode(token);
                return decodes;
            }
        } catch (error) {
            console.error('Erreur: '+error);
        }
    },
    

}

export default clientApi;