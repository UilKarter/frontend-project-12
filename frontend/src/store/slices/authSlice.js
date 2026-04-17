import { createSlice } from '@reduxjs/toolkit'
import { getToken, setToken, removeToken } from '../../utils/auth'

const initialState = {
  token: getToken() || null,
  isLoading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true
      state.error = null
    },
    loginSuccess: (state, action) => {
      const { token } = action.payload

      state.isLoading = false
      state.token = token
      state.error = null

      setToken(token)
    },
    loginFailure: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    logout: (state) => {
      state.token = null
      state.isLoading = false
      state.error = null

      removeToken()
    },
    clearError: (state) => {
      state.error = null
    },
  },
})

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  clearError,
} = authSlice.actions

export default authSlice.reducer
