import { createSlice } from '@reduxjs/toolkit'

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpen: false,
    type: null, // 'add', 'rename', 'remove'
    data: null,
  },
  reducers: {
    openModal: (state, { payload }) => {
      state.isOpen = true
      state.type = payload.type
      state.data = payload.data || null
    },
    closeModal: (state) => {
      state.isOpen = false
      state.type = null
      state.data = null
    },
  },
})

export const { openModal, closeModal } = modalSlice.actions
export default modalSlice.reducer
