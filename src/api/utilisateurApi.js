import axios from "axios";
import {jwtDecode} from "jwt-decode";
const userBaseUrl = 'http://localhost:5000/api/utilisateur';

const utilisateurApi = {
    connexion: async (data) =>{
        try {
            const rep = await axios.post(`${userBaseUrl}/connexion`,data);
            return rep.data;
        } catch (error) {
            throw error;
        }
    },

    getProfile: async (data) =>{
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

    deconnexion: async () => {
        try {
            await axios.post(`${userBaseUrl}/deconnexion`);
            localStorage.removeItem('token');
        } catch (error) {
            console.error('Erreur lors de la deconnexion: ',error);
        }
    }

}

export default utilisateurApi;
