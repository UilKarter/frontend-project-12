import routes from './routes'
import authorization from './authorization'

const renameChannel = async (id, name) => {
  const response = await authorization.patch(routes.updateChannelPath(id), { name })
  return response.data
}

export default renameChannel
