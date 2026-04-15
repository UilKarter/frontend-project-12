import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'

const messagesAdapter = createEntityAdapter()

const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  reducers: {
    setMessages: messagesAdapter.setAll,
    postMessage: messagesAdapter.addOne,
  },
})

export const messagesSelectors = messagesAdapter.getSelectors(state => state.messages)

export const {
  setMessages,
  addMessage,
  postMessage,
} = messagesSlice.actions

export default messagesSlice.reducer
