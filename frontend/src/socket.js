import { io } from 'socket.io-client'
import { toast } from 'react-toastify'
import { addChannel, renameChannel, removeChannel } from './store/slices/channelsSlice'
import { postMessage, removeMessagesByChannel } from './store/slices/messagesSlice'

const socket = io({ autoConnect: false })

export const initSocket = ({ dispatch, t }) => {
  const onConnectError = (err) => {
    console.error(t('socket.connectError'), err)
    toast.error(t('socket.connectError'))
  }
  const onDisconnect = () => {
    toast.warning(t('socket.disconnect'))
  }
  const onNewMessage = (payload) => {
    dispatch(postMessage(payload))
  }
  const onNewChannel = (channel) => {
    dispatch(addChannel(channel))
  }
  const onRenameChannel = ({ id, name }) => {
    dispatch(renameChannel({ id, changes: { name } }))
  }
  const onRemoveChannel = ({ id }) => {
    dispatch(removeChannel(id))
    dispatch(removeMessagesByChannel(id))
  }

  socket.on('connect_error', onConnectError)
  socket.on('disconnect', onDisconnect)
  socket.on('newMessage', onNewMessage)
  socket.on('newChannel', onNewChannel)
  socket.on('renameChannel', onRenameChannel)
  socket.on('removeChannel', onRemoveChannel)

  socket.connect()

  return () => {
    socket.off('connect_error', onConnectError)
    socket.off('disconnect', onDisconnect)
    socket.off('newMessage', onNewMessage)
    socket.off('newChannel', onNewChannel)
    socket.off('renameChannel', onRenameChannel)
    socket.off('removeChannel', onRemoveChannel)
  }
}

export default socket
