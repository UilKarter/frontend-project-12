import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import getChannels from '../api/getChannels'
import getMessages from '../api/getMessages'
import socket from '../socket'

import {
  setChannels,
  setCurrentChannelId,
  addChannel,
  renameChannel,
  removeChannel,
} from '../store/slices/channelsSlice'
import {
  setMessages,
  postMessage,
  removeMessagesByChannel,
} from '../store/slices/messagesSlice'

import Header from '../components/parts/Header'
import ChannelsList from '../components/parts/channels/ChannelList'
import MessagesHeader from '../components/parts/messages/MessagesHeader'
import MessagesList from '../components/parts/messages/MessagesList'
import MessageInput from '../components/parts/messages/MessageInput'

const HomePage = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const currentChannelId = useSelector(state => state.channels.currentChannelId)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [channelsData, messagesData] = await Promise.all([
          getChannels(),
          getMessages(),
        ])
        dispatch(setChannels(channelsData))
        dispatch(setMessages(messagesData))
        const general = channelsData.find(c => c.name === 'general')
        dispatch(setCurrentChannelId(general?.id || channelsData[0]?.id))
      }
      catch (err) {
        console.error(err)
        toast.error(t('home.messages.loadError'))
      }
    }
    fetchData()
  }, [dispatch, t])

  useEffect(() => {
    const onConnectError = () => toast.error(t('socket.connectError'))
    const onDisconnect = () => toast.warning(t('socket.disconnect'))

    socket.on('connect_error', onConnectError)
    socket.on('disconnect', onDisconnect)

    return () => {
      socket.off('connect_error', onConnectError)
      socket.off('disconnect', onDisconnect)
    }
  }, [t])

  useEffect(() => {
    const handleNewMessage = payload => dispatch(postMessage(payload))
    const handleNewChannel = channel => dispatch(addChannel(channel))
    const handleRenameChannel = ({ id, name }) => dispatch(renameChannel({ id, changes: { name } }))
    const handleRemoveChannel = ({ id }) => {
      dispatch(removeChannel(id))
      dispatch(removeMessagesByChannel(id))
    }

    socket.on('newMessage', handleNewMessage)
    socket.on('newChannel', handleNewChannel)
    socket.on('renameChannel', handleRenameChannel)
    socket.on('removeChannel', handleRemoveChannel)

    return () => {
      socket.off('newMessage', handleNewMessage)
      socket.off('newChannel', handleNewChannel)
      socket.off('renameChannel', handleRenameChannel)
      socket.off('removeChannel', handleRemoveChannel)
    }
  }, [dispatch])

  return (
    <div className="d-flex flex-column h-100 bg-light">
      <Header />
      <Container className="flex-grow-1 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white flex-md-row">
          <Col xs={5} md={3} lg={3} className="border-end px-0 bg-light flex-column h-100 d-flex">
            <ChannelsList />
          </Col>
          <Col className="d-flex flex-column p-0 h-100">
            <MessagesHeader channelId={currentChannelId} />
            <MessagesList channelId={currentChannelId} />
            <MessageInput channelId={currentChannelId} />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default HomePage
