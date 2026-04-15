import routes from './routes'
import authorization from './authorization'

const getMessages = async () => {
  const response = await authorization.get(routes.messagesPath())
  return response.data
}

export default getMessages
