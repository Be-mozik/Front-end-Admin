import axios from "axios";
import {jwtDecode} from "jwt-decode";
// const userBaseUrl = 'https://back-end-wxii.onrender.com/api/utilisateur';
const userBaseUrl = 'http://localhost:5000/api/utilisateur';

const token = localStorage.getItem('token');
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
    },

    getUtilisateurs: async () => {
        try {
            const utilisateurs = await axios.get(`${userBaseUrl}`);
            return utilisateurs;
        } catch (error) {
            console.error('Erreur lors de la requete: ',error);
        }
    },

    aproveDemande: async (id) => {
        try {
            const notif = await axios.get(`${userBaseUrl}/approuver/${id}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return notif.data;
        } catch (error) {
            console.error('Erreur lors de la requete: ',error);
        }
    },

    supprimerAccess: async (id) => {
        try {
            const rep = await axios.delete(`${userBaseUrl}/supprimer/${id}`);
            return rep.data;
        } catch (error) {
            console.error('Erreur lors de la requete: ',error);
        }
    }

}

export default utilisateurApi;
