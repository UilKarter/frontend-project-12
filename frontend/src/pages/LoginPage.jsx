import { useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Card, Button, Form } from 'react-bootstrap'
import { useFormik } from 'formik'

import Header from '../components/parts/Header'
import appRoutes from '../routes/appRoutes'
import useAuth from '../hooks/useAuth'
import avatar from '../assets/avatar.jpg'

const LoginPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const auth = useAuth()
  const { isLoading, error } = useSelector(state => state.auth)

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    onSubmit: async (values) => {
      await auth.login(values, t, navigate)
    },
  })

  return (
    <>
      <Header />
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <Card className="shadow-sm">
              <Card.Body className="row p-5">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <img src={avatar} className="rounded-circle" alt={t('auth.login')} />
                </div>
                <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-md-0">
                  <h1 className="text-center mb-4">{t('auth.login')}</h1>

                  <Form.Group className="form-floating mb-3" controlId="username">
                    <Form.Control
                      name="username"
                      type="text"
                      placeholder={t('auth.loginLabel')}
                      required
                      autoFocus
                      autoComplete="username"
                      onChange={formik.handleChange}
                      value={formik.values.username}
                    />
                    <Form.Label>{t('auth.loginLabel')}</Form.Label>
                  </Form.Group>

                  <Form.Group className="form-floating mb-4" controlId="password">
                    <Form.Control
                      name="password"
                      type="password"
                      placeholder={t('auth.passLabel')}
                      required
                      autoComplete="current-password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                    <Form.Label>{t('auth.passLabel')}</Form.Label>
                  </Form.Group>

                  {error && formik.submitCount > 0 && (
                    <div className="text-danger mb-3">{error}</div>
                  )}

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-100 mb-3"
                    variant="outline-primary"
                  >
                    {isLoading ? t('auth.loginLoading') : t('auth.login')}
                  </Button>
                </Form>
              </Card.Body>
              <Card.Footer className="p-4">
                <div className="text-center">
                  <span>
                    {t('auth.noAccount')}
                    {' '}
                  </span>
                  <Button
                    as={Link}
                    to={appRoutes.signup}
                    variant="link"
                    type="button"
                    className="p-0"
                  >
                    {t('auth.signup')}
                  </Button>
                </div>
              </Card.Footer>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage
