import routes from './routes'
import authorization from './authorization'

const removeChannel = async (id) => {
  const path = routes.updateChannelPath(id)
  const response = await authorization.delete(path)
  return response.data
}

export default removeChannel
