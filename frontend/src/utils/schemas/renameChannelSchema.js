import * as yup from 'yup'
import filter from '../profanityFilter'

const renameChannelSchema = (channelNames, currentName, t) => {
  return yup.object().shape({
    name: yup
      .string()
      .min(3, t('schemas.minmax'))
      .max(20, t('schemas.minmax'))
      .notOneOf(channelNames.filter(name => name !== currentName), t('schemas.notOneOf'))
      .required(t('schemas.required'))
      .test('no-profanity', t('schemas.profanity'), value => !filter.check(value)),
  })
}

export default renameChannelSchema
