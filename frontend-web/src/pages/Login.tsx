import { notifyError, notifySuccess } from '@/helpers/toastFunction'
import { AdminModel } from '@/models/admin'
import { PrivateRoutes } from '@/models/routes'
import { useEffect, useState } from 'react'
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

interface LoginData {
  username: string
  password: string
}

export interface BackendResponse {
  token: string
  isAuth: boolean
  userDb: AdminModel
  message?: string
}

const Login = () => {
  const [loginData, setLoginData] = useState<LoginData>({
    username: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  const API_URL = `${import.meta.env.VITE_API_URL}/auth-admin/login`

  useEffect(() => {
    localStorage.removeItem('auth')
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (loginData.username.length === 0) {
        notifyError('Usuario vacio!')
      } else if (loginData.password.length === 0) {
        notifyError('Contraseña vacia!')
      } else {
        setIsLoading(true)
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "access-control-allow-origin" : "*",
          },
          body: JSON.stringify(loginData),
        })

        const responseJson: BackendResponse = await response.json()

        if (!response.ok) {
          throw new Error(responseJson?.message)
        }

        localStorage.setItem('auth', JSON.stringify(responseJson))

        notifySuccess('Inicio de sesión correcto!')

        navigate(`/${PrivateRoutes.HOME}`, { replace: true })
      }
    } catch (error) {
      let message: string

      if (error instanceof Error) {
        message = error.message
      } else {
        message = error as string
      }
      if (message === 'Failed to fetch') {
        message = ' Error al conectar con el servidor'
      }
      notifyError(message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className='w-[420px] text-[#820486] flex flex-col justify-center items-center border-[2px] border-[#00000033] py-[40px] px-[30px] rounded-lg shadow-sm shadow-[#00000033]'>
      <h1 className='font-bold mb-[40px] text-4xl'>Iniciar Sesión</h1>
      <form
        onSubmit={handleSubmit}
        className='w-full flex flex-col items-center'
      >
        <div className='w-full'>
          <div className='flex items-center w-full mb-4 gap-2'>
            <FaUser className='text-[#820486]' size={24} />
            <input
              type='user'
              placeholder='Usuario'
              name='username'
              onChange={handleChange}
              className='w-full bg-transparent border-[2px] border-[#00000033] rounded-md text-black px-3 py-2 flex justify-start items-center'
            />
            <div>
              <FaUser size={24} className='text-transparent' />
            </div>
          </div>
          <div className='flex items-center w-full gap-2'>
            <FaLock className='text-[#820486]' size={24} />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Contraseña'
              name='password'
              onChange={handleChange}
              className='w-full bg-transparent border-[2px] border-[#00000033] rounded-md text-black px-3 py-2 flex justify-start items-center'
            />
            <div className='m-0' onClick={() => setShowPassword(!showPassword)}>
              {!showPassword ? (
                <FaEye size={24} className='cursor-pointer' />
              ) : (
                <FaEyeSlash size={24} className='cursor-pointer' />
              )}
            </div>
          </div>
        </div>
        <button
          disabled={isLoading}
          type='submit'
          className='mt-[40px] bg-white px-8 py-3 rounded-lg text-xl border-[1px] border-[#725ba7] text-[#725ba7] hover:bg-[#725ba7] hover:text-white transition-all duration-300 font-bold'
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  )
}

export default Login
