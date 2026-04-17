import { toast } from 'react-toastify'
import signupReq from '../api/signupReq'
import { loginStart, loginSuccess, loginFailure } from '../store/slices/authSlice'
import { setToken, setUsername } from '../utils/auth'

const signupAction = async (navigate, dispatch, values, { setFieldError }, t) => {
  dispatch(loginStart())

  try {
    const { token, username } = await signupReq(values)

    setToken(token)
    setUsername(username)

    dispatch(loginSuccess({ token, username }))
    navigate('/')
  }
  catch (error) {
    if (error.response?.status === 409) {
      setFieldError('username', t('auth.errors.alreadyCreated'))
    }
    else {
      const message = t('auth.errors.serverError')
      dispatch(loginFailure(message))
      toast.error(message)
    }
  }
}

export default signupAction
