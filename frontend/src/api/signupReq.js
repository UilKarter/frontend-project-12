import axios from 'axios'
import routes from './routes'

const signupReq = async (values) => {
  const response = await axios
    .post(routes.signupPath(), values)
  return response.data
}

export default signupReq
