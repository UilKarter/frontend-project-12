import { useFormik } from 'formik'
import { useRef, useState } from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import Header from '../components/parts/Header'
import signupAction from '../actions/signupAction'
import signupSchema from '../utils/schemas/signupSchema'
import avatar from '../assets/avatar_1.jpg'

const SignupPage = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const inputRef = useRef(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const formik = useFormik({
    initialValues: { username: '', password: '', confirmPassword: '' },
    validationSchema: signupSchema(t),
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values, { setFieldError }) => {
      setIsSubmitting(true)
      try {
        await signupAction(navigate, dispatch, values, { setFieldError }, t)
      }
      finally {
        setIsSubmitting(false)
      }
    },
  })

  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <Card className="shadow-sm">
              <Card.Body className="row p-5">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <img
                    src={avatar}
                    className="rounded-circle"
                    alt={t('auth.signup')}
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                  />
                </div>
                <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-md-0">
                  <h1 className="text-center mb-4">{t('auth.signup')}</h1>

                  <Form.Group className="form-floating mb-3" controlId="username">
                    <Form.Control
                      name="username"
                      ref={inputRef}
                      autoFocus
                      placeholder={t('auth.loginRequirment')}
                      autoComplete="off"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      isInvalid={formik.touched.username && !!formik.errors.username}
                    />
                    <Form.Label>{t('auth.loginLabel')}</Form.Label>
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.username}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="form-floating mb-3" controlId="password">
                    <Form.Control
                      name="password"
                      type="password"
                      placeholder={t('auth.passRequirment')}
                      autoComplete="off"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      isInvalid={formik.touched.password && !!formik.errors.password}
                    />
                    <Form.Label>{t('auth.passLabel')}</Form.Label>
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="form-floating mb-4" controlId="confirmPassword">
                    <Form.Control
                      name="confirmPassword"
                      type="password"
                      placeholder={t('auth.confirmRequirment')}
                      autoComplete="off"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.confirmPassword}
                      isInvalid={
                        formik.touched.confirmPassword && !!formik.errors.confirmPassword
                      }
                    />
                    <Form.Label>{t('auth.passConfirmLabel')}</Form.Label>
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.confirmPassword}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-100 mb-3"
                    variant="outline-primary"
                  >
                    {isSubmitting ? t('auth.signupLoading') : t('auth.signupButton')}
                  </Button>
                </Form>
              </Card.Body>
              <Card.Footer className="p-4">
                <div className="text-center">
                  <span>
                    {t('auth.hasAccount')}
                    {' '}
                  </span>
                  <Button
                    as={Link}
                    to="/login"
                    variant="link"
                    type="button"
                    className="p-0"
                  >
                    {t('auth.login')}
                  </Button>
                </div>
              </Card.Footer>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
