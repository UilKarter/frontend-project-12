import routes from './routes'
import authorization from './authorization'

const postChannel = async (name) => {
  const response = await authorization.post(routes.channelPath(), { name })
  return response.data
}

export default postChannel
