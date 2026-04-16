import * as yup from 'yup'

const postChannelSchema = (channelNames) => {
  return yup.object().shape({
    name: yup
      .string()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .notOneOf(channelNames, 'Канал уже существует')
      .required('Обязательное поле'),
  })
}

export default postChannelSchema
