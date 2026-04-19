import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react'

import AuthProvider from './contexts/AuthProvider'
import SocketProvider from './contexts/SocketProvider'
import appRoutes from './routes/appRoutes'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import SignupPage from './pages/SignupPage'
import ProtectedRoute from './components/ProtectedRoute'
import ModalRoot from './components/ModalRoot'

const rollbarConfig = {
  accessToken: import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN,
  environment: import.meta.env.MODE,
  captureUncaught: true,
  captureUnhandledRejections: true,
}

const App = () => {
  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <AuthProvider>
          <SocketProvider>
            <Routes>
              <Route
                path={appRoutes.home}
                element={(
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                )}
              />
              <Route path={appRoutes.login} element={<LoginPage />} />
              <Route path={appRoutes.signup} element={<SignupPage />} />
              <Route path={appRoutes.notFound} element={<NotFoundPage />} />
              <Route path="*" element={<Navigate to={appRoutes.notFound} replace />} />
            </Routes>
            <ToastContainer />
            <ModalRoot />
          </SocketProvider>
        </AuthProvider>
      </ErrorBoundary>
    </RollbarProvider>
  )
}

export default App
