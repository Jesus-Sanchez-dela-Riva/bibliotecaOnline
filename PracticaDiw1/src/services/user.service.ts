import axios from 'axios';
import { useAuthStore } from '@/stores/auth'

const getAuthConfig = () => {
    const authStore = useAuthStore()

    if (!authStore.user) {
        throw new Error('No autenticado')
    }

    return {
        auth: {
            username: authStore.user.username,
            password: authStore.user.username === 'admin' ? 'adminpass' : 'userpass'
        }
    }
}

export const getBooksAvailable = async () => {
    try{
        const { data } = await axios.get('http://localhost:8080/usuarios/libros/disponibles',getAuthConfig());
        return data;
    }catch(error){
        throw new Error ('Error al cargar libros disponibles')
    }
};

export const getBooksByUser = async (usuarioId: number) => {
    try{
        const { data } = await axios.get(`http://localhost:8080/usuarios/${usuarioId}/prestamos`,getAuthConfig());
        return data;
    }catch(error){
        throw new Error ('Error al cargar libros del usario')
    }
};

export const solicitarPrestamo = async (usuarioId: number, libroId: number) => {
    try {
        const { data } = await axios.post(`http://localhost:8080/usuarios/${usuarioId}/prestamos/${libroId}`,{}, getAuthConfig())
        return data
    } catch (error) {
        throw new Error('Error al solicitar el préstamo')
    }
};

export const devolverPrestamo = async (usuarioId: number, libroId: number) => {
    try {
        const { data } = await axios.post(`http://localhost:8080/usuarios/${usuarioId}/devoluciones/${libroId}`, {}, getAuthConfig())
        return data
    } catch (error) {
        throw new Error('Error al devolver el préstamo')
    }
}