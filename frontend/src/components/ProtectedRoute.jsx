import { Navigate } from 'react-router-dom'
import { isAuthenticated } from '../utils/auth'
import appRoutes from '../routes/appRoutes'

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to={appRoutes.login} replace />
}

export default ProtectedRoute
