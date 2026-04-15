import loginRequest from '../api/loginReq.js'
import { toast } from 'react-toastify'
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from '../store/slices/authSlice.js'

const loginAction = async (navigate, dispatch, values) => {
  dispatch(loginStart())

  try {
    const data = await loginRequest(values)

    const { token } = data
    const { username } = values

    if (!token) {
      throw new Error('Нет токена в ответе')
    }

    localStorage.setItem('token', token)
    localStorage.setItem('username', username)

    dispatch(loginSuccess({ token }))
    navigate('/')
  }
  catch (error) {
    const message
      = error.response?.status === 401
        ? 'Неверное имя пользователя или пароль'
        : 'Ошибка соединения с сервером'

    dispatch(loginFailure(message))
    toast.error(message)
  }
}

export default loginAction
