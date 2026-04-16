import { toast } from 'react-toastify'
import signupReq from '../api/signupReq'
import { loginStart, loginSuccess, loginFailure } from '../store/slices/authSlice'

const signupAction = async (navigate, dispatch, values, { setFieldError }) => {
  dispatch(loginStart())

  try {
    const { token, username } = await signupReq(values)

    localStorage.setItem('token', token)
    localStorage.setItem('username', username)
    dispatch(loginSuccess({ token, username }))
    navigate('/')
  }
  catch (error) {
    if (error.response?.status === 409) {
      setFieldError('username', 'Пользователь уже существует')
    }
    else {
      const message = 'Ошибка соединения с сервером'
      dispatch(loginFailure(message))
      toast.error(message)
    }
  }
}

export default signupAction
