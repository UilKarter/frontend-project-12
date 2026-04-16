import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'

const messagesAdapter = createEntityAdapter()

const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  reducers: {
    setMessages: messagesAdapter.setAll,
    postMessage: messagesAdapter.addOne,
    removeMessagesByChannel: (state, { payload: channelId }) => {
      const messagesToRemove = state.ids.filter(id => state.entities[id]?.channelId === channelId)
      messagesToRemove.forEach((id) => {
        delete state.entities[id]
      })
      state.ids = state.ids.filter(id => !messagesToRemove.includes(id))
    },
  },
})

export const messagesSelectors = messagesAdapter.getSelectors(state => state.messages)

export const {
  setMessages,
  postMessage,
  removeMessagesByChannel,
} = messagesSlice.actions

export default messagesSlice.reducer
