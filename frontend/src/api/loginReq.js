import axios from 'axios'
import routes from './routes'

const loginReq = async (values) => {
  const response = await axios
    .post(routes.authPath(), values)
  return response.data
}

export default loginReq
