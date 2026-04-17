import * as yup from 'yup'

const signupSchema = (t) => {
  return yup.object().shape({
    username: yup
      .string()
      .min(3, t('schemas.minmax'))
      .max(20, t('schemas.minmax'))
      .required(t('schemas.required')),
    password: yup
      .string()
      .min(6, t('schemas.min'))
      .required(t('schemas.required')),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], t('auth.confirmRequirment'))
      .required(t('schemas.required')),
  },
  )
}

export default signupSchema
