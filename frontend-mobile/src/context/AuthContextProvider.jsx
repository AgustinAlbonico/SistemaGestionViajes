import axios from 'axios'
import { createContext, useState, useContext, useEffect } from 'react'
import * as SecureStore from 'expo-secure-store'
// import { API_URL } from "../constants";
import {
  showErrorToast,
  showInfoToast,
  showSuccessToast,
} from '../utils/toastFunctions'
import { useNavigation } from '@react-navigation/native'
import { vibrate } from '../utils/vibrate'

export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

// export const API_URL =
//   'https://app-backend-bottarelli-production.up.railway.app/api'

export const API_URL = 'https://nodejs-production-0d6d.up.railway.app/api'

const AuthContextProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    username: null,
    token: null,
    authenticated: null,
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const loadToken = async () => {
      const res = JSON.parse(await SecureStore.getItemAsync('access_token'))

      if (res?.token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.token}`

        setAuthState({
          token: res.token,
          authenticated: true,
        })
      }
    }
    loadToken()
  }, [])

  const login = async (username, password) => {
    setLoading(true)
    try {
      const result = await axios.post(`${API_URL}/auth/login`, {
        username,
        password,
      })
      
      let token = result.data.token
      let user = result.data.userDb

      if (token.length > 0) {
        setAuthState({ token, authenticated: true, username: user.username })

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

        await SecureStore.setItemAsync(
          'access_token',
          JSON.stringify({
            token,
            nombre: user.nombre,
            apellido: user.apellido,
          })
        )

        showSuccessToast('Sesión iniciada con exito!')

        vibrate(100)
      }
    } catch (error) {
      showErrorToast(error.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    await SecureStore.deleteItemAsync('access_token')

    axios.defaults.headers.common['Authorization'] = ''

    setAuthState({
      username: null,
      token: null,
      authenticated: false,
    })
  }

  return (
    <AuthContext.Provider value={{ login, logout, authState, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
export default AuthContextProvider
