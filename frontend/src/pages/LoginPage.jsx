import { Formik, Form, Field } from 'formik'

const LoginPage = () => {
  return (
    <div>
      <h1>Вход</h1>

      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        onSubmit={(values) => {
          console.log(values) // placeholder
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="username">Имя пользователя</label>
              <Field name="username" type="text" />
            </div>

            <div>
              <label htmlFor="password">Пароль</label>
              <Field name="password" type="password" />
            </div>

            <button type="submit" disabled={isSubmitting}>
              Войти
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default LoginPage
