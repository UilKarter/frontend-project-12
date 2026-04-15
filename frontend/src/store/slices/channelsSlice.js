import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  entities: {},
  ids: [],
  currentChannelId: '',
}

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: (state, action) => {
      const channels = action.payload
      state.entities = {}
      channels.forEach((ch) => {
        state.entities[ch.id] = ch
      })
      state.ids = channels.map(ch => ch.id)
    },
  },
})

export const { setChannels } = channelsSlice.actions
export default channelsSlice.reducer
