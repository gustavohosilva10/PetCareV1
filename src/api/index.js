import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const BASE_API = 'https://b789-2804-214-c003-11f3-7aed-522d-b427-3303.ngrok-free.app';

export default {
    login: async (email, password) => {
        try {
            const response = await axios.post(`${BASE_API}/api/login`, {
                email: email,
                password: password,
            });

            if (response.data.token) {
                await AsyncStorage.setItem('token', response.data.token);

                return response;
            }

            if (response.data.errors) {
                return { errors: response.data.errors };
            }

            if (response.data.error) {
                return { error: response.data.error };
            }

        } catch (error) {
            if (error.response.status === 422) {
                return { errors: error.response.data.errors };
            } else {
                return 'Erro ao realizar o login';
            }
        }
    },

    register: async (email, name, password, document, cellphone, birth_date) => {
        try {
            const response = await axios.post(`${BASE_API}/api/register`, {
                name,
                cellphone,
                email,
                password,
                document,
                birth_date
            });
            return response;
  
        } catch (error) {
            if (error.response.status === 422) {
                return { errors: error.response.data.errors };
            } else {
                return 'Erro ao realizar o login';
            }
        }
    },

    resetPassword: async (email) => {
        const response = await axios.post(`${BASE_API}/api/resetPassword`, {
            email
        });

        if (response) {
            return response;
        }
    },

    user: async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get(`${BASE_API}/api/user/get`, { headers: { "Authorization": `Bearer ${token}` } });

            if (response.data) {
                return response.data[0];
            }
        } catch (error) {
            alert('Por favor tente mais tarde! ;(');
        }
    },

    pets: async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get(`${BASE_API}/api/petsUser/get`, { headers: { "Authorization": `Bearer ${token}` } });
            if (response.data) {
                return response.data;
            }
        } catch (error) {
            alert('Por favor tente mais tarde! ;(');
        }
    },

    getinfopets: async () => {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(`${BASE_API}/api/petsUser/informations`, { headers: { "Authorization": `Bearer ${token}` } });

        if (response.data) {
            return response.data;
        }
    },

    registerPets: async (name, date, sex, file_pet, category, port, temperament, weight) => {
        try {
            const token = await AsyncStorage.getItem('token');
            const data = {
                name: name,
                date: date,
                sex: sex,
                file_pet: file_pet,
                category: category,
                port: port,
                temperament: temperament,
                weight: weight
            }
            console.log(data);
            const headers = {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
            const response = await axios.post(`${BASE_API}/api/petsUser/store`, data, { headers: headers });
            if (response.data) {
                return response.data;
            }
        } catch (error) {
            return error.response.error;
        }
    },

    getInfoPetSelect: async () => {
        const token = await AsyncStorage.getItem('token');
        const idPet = await AsyncStorage.getItem('idPet');

        const response = await axios.get(`${BASE_API}/api/petsUser/show/${idPet}`, { headers: { "Authorization": `Bearer ${token}` } });

        if (response.data) {
            return response.data;
        }
    },

    registerVaccine: async (nameMedicament, doseMedicament, doseMl, dateAtualOne, dateAtualTwo) => {
        try {
            const idPet = await AsyncStorage.getItem('idPet');
            const token = await AsyncStorage.getItem('token');
            const data = {
                id_pet: idPet,
                name_vaccine: nameMedicament,
                date: dateAtualOne,
                dose_vaccine: doseMedicament,
                dose_vaccine_ml: doseMl,
                date: dateAtualOne,
                repeat_vaccine: dateAtualTwo
            }
            console.log(data);

            const headers = {
                "Authorization": `Bearer ${token}`
            }
            const response = await axios.post(`${BASE_API}/api/petsVaccines/store`, data, { headers: headers });

            if (response.data) {
                return response.data;
            }
        } catch (error) {
            return error.response.data.error;
        }


    },

    getInfoVaccine: async () => {
        const token = await AsyncStorage.getItem('token');
        const idPet = await AsyncStorage.getItem('idPet');

        const response = await axios.get(`${BASE_API}/api/petsVaccines/show/${idPet}`, { headers: { "Authorization": `Bearer ${token}` } });

        if (response.data) {
            return response.data;
        }
    },

    removeVaccine: async (id_vaccine) => {
        const token = await AsyncStorage.getItem('token');
        const idPet = await AsyncStorage.getItem('idPet');
        const idVaccine = id_vaccine;

        const response = await axios.delete(`${BASE_API}/api/petsVaccines/delete/${idVaccine}`, { headers: { "Authorization": `Bearer ${token}` } });
        if (response.data) {
            return response.data;
        }
    },

    registeMedicament: async (nameVaccine, doseVaccine, doseMl, dateAtualOne, dateAtualTwo) => {
        try {
            const token = await AsyncStorage.getItem('token');
            const idPet = await AsyncStorage.getItem('idPet');
            const data = {
                id_pet: idPet,
                name_medicament: nameVaccine,
                date: dateAtualOne,
                dose_medicament: doseVaccine,
                dose_medicament_ml: doseMl,
                repeat_medicament: dateAtualTwo,
            }
            const headers = {
                "Authorization": `Bearer ${token}`
            }

            const response = await axios.post(`${BASE_API}/api/petsMedicaments/store`, data, { headers: headers });
            if (response.data) {
                return response.data;
            }
        } catch (error) {
            return error.response.error;
        }
    },

    getInfoMedicament: async () => {
        const token = await AsyncStorage.getItem('token');
        const idPet = await AsyncStorage.getItem('idPet');

        const response = await axios.get(`${BASE_API}/api/petsMedicaments/show/${idPet}`, { headers: { "Authorization": `Bearer ${token}` } });

        if (response.data) {
            return response.data;
        }
    },

    removeMedicament: async (id_medicament) => {
        const token = await AsyncStorage.getItem('token');
        const idPet = await AsyncStorage.getItem('idPet');
        const idMedicament = id_medicament;

        const response = await axios.delete(`${BASE_API}/api/petsMedicaments/delete/${idMedicament}`, { headers: { "Authorization": `Bearer ${token}` } });
        if (response.data) {
            return response.data;
        }
    },

    userUpdate: async (name, cellphone, password, fatherMother) => {
        try {
            const token = await AsyncStorage.getItem('token');
            const data = {
                name: name,
                cellphone: cellphone,
                password: password,
                father_or_mother: fatherMother
            }
            const headers = {
                "Authorization": `Bearer ${token}`
            }
            const response = await axios.post(`${BASE_API}/api/user/edit`, data, { headers: headers });

            return response.data;
        } catch (error) {
            return error.response.data.error;
        }


    },

    getHistoryQr: async () => {
        const token = await AsyncStorage.getItem('token');
        const idPet = await AsyncStorage.getItem('idPet');

        const response = await axios.get(`${BASE_API}/api/petsHistory/get/${idPet}`, { headers: { "Authorization": `Bearer ${token}` } });

        if (response.data) {
            return response.data;
        }
    },


};