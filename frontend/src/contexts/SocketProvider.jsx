// src/contexts/SocketProvider.jsx
import { useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import i18n from '../i18n'
import socket from '../socket'
import { SocketContext } from './SocketContext'
import {
  addChannel,
  renameChannel,
  removeChannel,
} from '../store/slices/channelsSlice'
import {
  postMessage,
  removeMessagesByChannel,
} from '../store/slices/messagesSlice'

export const SocketProvider = ({ children }) => {
  const dispatch = useDispatch()
  const t = i18n.t

  useEffect(() => {
    const onConnectError = () => toast.error(t('socket.connectError'))
    const onDisconnect = () => toast.warning(t('socket.disconnect'))
    const onNewMessage = payload => dispatch(postMessage(payload))
    const onNewChannel = channel => dispatch(addChannel(channel))
    const onRenameChannel = ({ id, name }) => dispatch(renameChannel({ id, changes: { name } }))
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

    return () => {
      socket.off('connect_error', onConnectError)
      socket.off('disconnect', onDisconnect)
      socket.off('newMessage', onNewMessage)
      socket.off('newChannel', onNewChannel)
      socket.off('renameChannel', onRenameChannel)
      socket.off('removeChannel', onRemoveChannel)
    }
  }, [dispatch, t])

  const api = useMemo(() => ({
    sendMessage: data => socket.emit('newMessage', data),
    createChannel: data => socket.emit('newChannel', data),
    renameChannel: data => socket.emit('renameChannel', data),
    removeChannel: data => socket.emit('removeChannel', data),
    isConnected: () => socket.connected,
  }), [])

  return (
    <SocketContext.Provider value={api}>
      {children}
    </SocketContext.Provider>
  )
}
