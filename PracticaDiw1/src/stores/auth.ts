import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export interface User {
    id: number
    username: string
    role: 'admin' | 'user'
    name?: string
    email?: string
}

export const useAuthStore = defineStore('auth', () => {
    const _user = ref<User | null>(null)
    const _token = ref<string | null>(null)
    const _loading = ref(false)

    // Inicializar desde localStorage
    const init = () => {
        const token = localStorage.getItem('token')
        const user = localStorage.getItem('user')

        if (token && user) {
            _token.value = token
            _user.value = JSON.parse(user)
        }
    }

    // Getters
    const user = computed(() => _user.value)
    const token = computed(() => _token.value)
    const isAuthenticated = computed(() => !!_user.value)
    const loading = computed(() => _loading.value)

    // LOGIN CON CREDENCIALES DE PRUEBA
    async function login(credentials: { username: string; password: string }) {
        _loading.value = true

        try {
            // ADMIN
            if (credentials.username === 'admin' && credentials.password === 'adminpass') {
                const mockUser: User = {
                    id: 1,
                    username: 'admin',
                    role: 'admin',
                    name: 'Administrador'
                }
                const mockToken = 'mock-token-admin-' + Date.now()

                _user.value = mockUser
                _token.value = mockToken

                localStorage.setItem('token', mockToken)
                localStorage.setItem('user', JSON.stringify(mockUser))

                return true
            }

            // USER
            if (credentials.username === 'user' && credentials.password === 'userpass') {
                const mockUser: User = {
                    id: 2,
                    username: 'user',
                    role: 'user',
                    name: 'Usuario Regular'
                }
                const mockToken = 'mock-token-user-' + Date.now()

                _user.value = mockUser
                _token.value = mockToken

                localStorage.setItem('token', mockToken)
                localStorage.setItem('user', JSON.stringify(mockUser))

                return true
            }

            // Credenciales incorrectas
            throw new Error('Usuario o contraseña incorrectos')

        } catch (error: any) {
            // Limpiar estado en caso de error
            _user.value = null
            _token.value = null
            localStorage.removeItem('token')
            localStorage.removeItem('user')

            throw error
        } finally {
            _loading.value = false
        }
    }

    function logout() {
        _user.value = null
        _token.value = null

        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }

    // Ejecutar init al crear el store
    init()

    return {
        user,
        token,
        isAuthenticated,
        loading,
        login,
        logout
    }
})