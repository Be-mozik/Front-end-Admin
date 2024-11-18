import axios from "axios";

// const demandeBaseUrl = 'https://back-end-wxii.onrender.com/api/demande';
const demandeBaseUrl = 'http://localhost:5000/api/demande';


const demandeApi = {
    demander: async (data) =>{
        try {
            const rep = await axios.post(`${demandeBaseUrl}/envoyerDemande`,data);
            return rep.data;
        } catch (error) {
            throw error;
        }
    },

    getDemandes: async () => {
        try {
            const demandes = await axios.get(`${demandeBaseUrl}`);
            return demandes.data;
        } catch (error) {
            throw error;
        }
    },

    supprimerDemande: async (id) => {
        try {
            const rep = await axios.delete(`${demandeBaseUrl}/supprimer/${id}`);
            return rep.data;
        } catch (error) {
            throw error;
        }
    }
}

export default demandeApi;