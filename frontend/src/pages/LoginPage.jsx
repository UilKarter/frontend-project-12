import { Formik, Form, Field } from 'formik'
import { useNavigate, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginStart, loginSuccess, loginFailure, clearError } from '../features/auth/authSlice'
import api from '../api'
import routes from '../routes.js'

const LoginPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { token, isLoading, error } = useSelector(state => state.auth)

  if (token) {
    return <Navigate to="/" replace />
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    dispatch(clearError())
    dispatch(loginStart())

    try {
      const response = await api.post(routes.login(), values)
      dispatch(loginSuccess({ token: response.data.token }))
      navigate('/')
    }
    catch (err) {
      const message
        = err.response?.status === 401
          ? 'Неверное имя пользователя или пароль'
          : 'Произошла ошибка'

      dispatch(loginFailure(message))
    }
    finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="login-container">
      <h1 className="login-title">Вход</h1>

      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="login-form">

            <div className="form-group">
              <label htmlFor="username">Имя пользователя</label>
              <Field name="username" type="text" />
            </div>

            <div className="form-group">
              <label htmlFor="password">Пароль</label>
              <Field name="password" type="password" />
            </div>

            {error && <div className="error">{error}</div>}

            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="submit-button"
            >
              Войти
            </button>

          </Form>
        )}
      </Formik>
    </div>
  )
}

export default LoginPage
