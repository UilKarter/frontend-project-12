import { createSlice } from '@reduxjs/toolkit'
import { getToken, getUsername } from '../../utils/auth'

const initialState = {
  token: getToken() || null,
  username: getUsername() || null,
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
      const { token, username } = action.payload

      state.isLoading = false
      state.token = token
      state.username = username
      state.error = null
    },
    loginFailure: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    logout: (state) => {
      state.token = null
      state.username = null
      state.isLoading = false
      state.error = null
    },
  },
})

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
} = authSlice.actions

export default authSlice.reducer
