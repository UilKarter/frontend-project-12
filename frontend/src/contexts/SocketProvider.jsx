import { useMemo } from 'react'
import ApiContext from './ApiContext'
import sendMessage from '../api/sendMessage'
import postChannelAction from '../actions/postChannelAction'
import renameChannelAction from '../actions/renameChannelAction'
import removeChannelAction from '../actions/removeChannelAction'

const SocketProvider = ({ children }) => {
  const api = useMemo(() => ({
    sendMessage,
    postChannelAction,
    renameChannelAction,
    removeChannelAction,
  }), [])

  return (
    <ApiContext.Provider value={api}>
      {children}
    </ApiContext.Provider>
  )
}

export default SocketProvider
