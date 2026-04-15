import routes from './routes'
import authorization from './authorization'

const getMessages = async () => {
  const response = await authorization.get(routes.getMessages())
  return response.data
}

export default getMessages
