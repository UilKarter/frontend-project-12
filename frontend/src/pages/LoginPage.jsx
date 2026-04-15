import { Card, Button, Form } from 'react-bootstrap'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import loginAction from '../actions/loginAction'
import avatar from '../assets/avatar.jpg'

const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isLoading, error } = useSelector(state => state.auth)

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      await loginAction(navigate, dispatch, values)
    },
  })
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img
                  src={avatar}
                  className="rounded-circle"
                  alt="Войти"
                />
              </div>
              <Form
                onSubmit={formik.handleSubmit}
                className="col-12 col-md-6 mt-3 mt-md-0"
              >
                <h1 className="text-center mb-4">Войти</h1>
                <Form.Group className="form-floating mb-3" controlId="username">
                  <Form.Control
                    name="username"
                    type="text"
                    placeholder="Ваш ник"
                    required
                    autoFocus
                    autoComplete="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                  />
                  <Form.Label>Ваш ник</Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-4" controlId="password">
                  <Form.Control
                    name="password"
                    type="password"
                    placeholder="Пароль"
                    required
                    autoComplete="current-password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  <Form.Label>Пароль</Form.Label>
                </Form.Group>
                {error && (
                  <div className="text-danger mb-3">
                    {error}
                  </div>
                )}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-100 mb-3"
                  variant="outline-primary"
                >
                  {isLoading ? 'Входим...' : 'Войти'}
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>Нет аккаунта? </span>
                <a href="/signup">Регистрация</a>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
