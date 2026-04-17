import { toast } from 'react-toastify'
import loginReq from '../api/loginReq'
import { loginStart, loginSuccess, loginFailure } from '../store/slices/authSlice'
import { setToken, setUsername } from '../utils/auth'

const loginAction = async (navigate, dispatch, values, t) => {
  dispatch(loginStart())

  try {
    const data = await loginReq(values)
    const { token } = data
    const { username } = values

    if (!token) {
      throw new Error(t('auth.errors.noToken'))
    }

    setToken(token)
    setUsername(username)

    dispatch(loginSuccess({ token }))
    navigate('/')
  }
  catch (error) {
    const message = error.response?.status === 401
      ? t('auth.errors.wrongLogin')
      : t('auth.errors.serverError')
    dispatch(loginFailure(message))
    toast.error(message)
  }
}

export default loginAction
