import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'

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

import ChannelsList from '../components/parts/channels/ChannelList'
import MessagesHeader from '../components/parts/messages/MessagesHeader'
import MessagesList from '../components/parts/messages/MessagesList'
import MessageInput from '../components/parts/messages/MessageInput'

const HomePage = () => {
  const dispatch = useDispatch()
  const currentChannelId = useSelector(state => state.channels.currentChannelId)

  useEffect(() => {
    const fetchData = async () => {
      const [channelsData, messagesData] = await Promise.all([
        getChannels(),
        getMessages(),
      ])
      dispatch(setChannels(channelsData))
      dispatch(setMessages(messagesData))

      const general = channelsData.find(c => c.name === 'general')
      dispatch(setCurrentChannelId(general?.id || channelsData[0]?.id))
    }
    fetchData()
  }, [dispatch])

  useEffect(() => {
    const handleNewMessage = (payload) => {
      dispatch(postMessage(payload))
    }

    const handleNewChannel = (channel) => {
      dispatch(addChannel(channel))
    }

    const handleRenameChannel = ({ id, name }) => {
      dispatch(renameChannel({ id, changes: { name } }))
    }

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
    <div className="h-100 bg-light">
      <div className="h-100">
        <div className="h-100" id="chat">
          <div className="d-flex flex-column h-100">
            <Container className="h-100 my-4 overflow-hidden rounded shadow">
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
        </div>
      </div>
    </div>
  )
}

export default HomePage
