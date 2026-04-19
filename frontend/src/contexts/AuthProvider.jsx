import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import AuthContext from './AuthContext'
import loginAction from '../actions/loginAction'
import signupAction from '../actions/signupAction'

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch()

  const auth = useMemo(() => ({
    login: async (values, t, navigate) => loginAction(navigate, dispatch, values, t),
    signup: async (values, helpers, t, navigate) => signupAction(navigate, dispatch, values, helpers, t),
  }), [dispatch])

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
