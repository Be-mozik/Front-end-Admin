import axios from "axios";

const eventBaseUrl = 'https://back-end-wxii.onrender.com/api/event';

const token = localStorage.getItem('token');
const tokenClient = localStorage.getItem('tokenClient');
const eventApi = {
    creerEvent: async (data) =>{
        try {
            const rep = await axios.post(`${eventBaseUrl}/creerEvent`,data,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return rep.data;
        } catch (error) {
            throw error;
        }
    },
    getEvents: async () => {
        try {
            const response = await axios.get(`${eventBaseUrl}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response;
        } catch (error) {
            console.error('Erreur lors de la récupération des événements:', error);
            throw error;
        }
    },
    getEventById: async (id) => {
        try {
            const rep = await axios.get(`${eventBaseUrl}/${id}`);
            return rep;
        } catch (error) {
            throw error;
        }
    },

    annulerEvent: async (id) => {
        try {            
            const rep = await axios.put(
                `${eventBaseUrl}/annuler/${id}`, 
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            return rep;
        } catch (error) {
            console.error('Erreur lors de l\'annulation de l\'événement :', error);
            throw error;
        }
    },

    updateEvent: async (data) => {
        try {
            const rep = await axios.put(`${eventBaseUrl}/modifier`,data,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return rep;
        } catch (error) {
            console.error('Erreur: ',error.response.data);
        }
    },

    eventValide: async () => {
        try {
            const response = await axios.get(`${eventBaseUrl}/evenement`);
            return response;
        } catch (error) {
            console.error('Erreur lors de la récupération des événements:', error);
            throw error;
        }
    }
}

export default eventApi;