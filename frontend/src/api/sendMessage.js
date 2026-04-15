import routes from './routes'
import authorization from './authorization'

const sendMessage = async (newMessage) => {
  const response = await authorization.post(routes.messagesPath(), newMessage)
  return response.data
}

export default sendMessage
