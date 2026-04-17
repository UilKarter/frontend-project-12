import * as yup from 'yup'
import filter from '../profanityFilter'

const postChannelSchema = (channelNames, t) => {
  return yup.object().shape({
    name: yup
      .string()
      .min(3, t('schemas.minmax'))
      .max(20, t('schemas.minmax'))
      .notOneOf(channelNames, t('schemas.notOneOf'))
      .required(t('schemas.required'))
      .test('no-profanity', t('schemas.profanity'), value => !filter.check(value)),
  })
}

export default postChannelSchema
