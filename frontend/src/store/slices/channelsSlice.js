import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'

const channelsAdapter = createEntityAdapter()

const channelsSlice = createSlice({
  name: 'channels',

  initialState: channelsAdapter.getInitialState({
    currentChannelId: null,
  }),

  reducers: {
    setChannels: channelsAdapter.setAll,
    addChannel: channelsAdapter.addOne,
    removeChannel: channelsAdapter.removeOne,
    renameChannel: channelsAdapter.updateOne,

    setCurrentChannelId: (state, action) => {
      state.currentChannelId = action.payload
    },
  },
})
export const channelsSelectors = channelsAdapter.getSelectors(state => state.channels)
export const {
  setChannels,
  addChannel,
  removeChannel,
  renameChannel,
  setCurrentChannelId,
} = channelsSlice.actions

export default channelsSlice.reducer
