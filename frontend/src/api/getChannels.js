import routes from './routes'
import authorization from './authorization'

const getChannels = async () => {
  const response = await authorization.get(routes.getChannels())
  return response.data
}

export default getChannels
