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


export const getBooks = async () => {
    try{
        const { data } = await axios.get('http://localhost:8080/admin/libros',getAuthConfig());
        return data;
    }catch(error){
        throw new Error ('Error al cargar libros')
    }
};

export const getUsers = async () => {
    try{
        const { data } = await axios.get('http://localhost:8080/admin/usuarios',getAuthConfig());
        console.log(data);
        return data;
    }catch(error){
        console.error('error fetching books:', error)
        throw new Error ('Failed to fetch books')
    }
};
export const createAdminUser = async (user: any) => {
    try {
        const { data } = await axios.post('http://localhost:8080/admin/usuarios', user, getAuthConfig());
        return data;
    } catch (error) {
        console.error('error creating user:', error);
        throw new Error('Failed to create user');
    }
};

export const updateBook = async (book: any) => {
    try {
        const { data } = await axios.put(`http://localhost:8080/admin/libros/${book.id}`, book, getAuthConfig())
        return data
    } catch (error) {
        throw new Error('Error al actualizar el libro')
    }
}

export const deleteBook = async (id: number) => {
    try {
        await axios.delete(`http://localhost:8080/admin/libros/${id}`, getAuthConfig())
    } catch (error) {
        throw new Error('Error al eliminar el libro')
    }
}

export const createBook = async (book: any) => {
    try {
        const { data } = await axios.post('http://localhost:8080/admin/libros', book, getAuthConfig())
        return data
    } catch (error) {
        throw new Error('Error al crear el libro')
    }
};

