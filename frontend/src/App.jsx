import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react'

import { SocketProvider } from './contexts/SocketProvider'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import SignupPage from './pages/SignupPage'
import ProtectedRoute from './components/ProtectedRoute'

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
        <SocketProvider>
          <Routes>
            <Route
              path="/"
              element={(
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              )}
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
          <ToastContainer />
        </SocketProvider>
      </ErrorBoundary>
    </RollbarProvider>
  )
}

export default App
