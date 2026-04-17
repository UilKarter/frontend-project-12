import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import getChannels from '../api/getChannels'
import getMessages from '../api/getMessages'

import {
  setChannels,
  setCurrentChannelId,
} from '../store/slices/channelsSlice'
import {
  setMessages,
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
  const [channelsLoaded, setChannelsLoaded] = useState(false)
  const [messagesLoaded, setMessagesLoaded] = useState(false)

  useEffect(() => {
    const loadChannels = async () => {
      try {
        const channelsData = await getChannels()
        dispatch(setChannels(channelsData))
        const general = channelsData.find(c => c.name === 'general')
        dispatch(setCurrentChannelId(general?.id || channelsData[0]?.id))
      }
      catch (err) {
        console.error('Ошибка загрузки каналов:', err)
        toast.error(t('home.channels.loadError'))
      }
      finally {
        setChannelsLoaded(true)
      }
    }

    const loadMessages = async () => {
      try {
        const messagesData = await getMessages()
        dispatch(setMessages(messagesData))
      }
      catch (err) {
        console.error('Ошибка загрузки сообщений:', err)
        toast.error(t('home.messages.loadError'))
      }
      finally {
        setMessagesLoaded(true)
      }
    }

    loadChannels()
    loadMessages()
  }, [dispatch, t])

  return (
    <div className="d-flex flex-column h-100 bg-light">
      <Header />
      <Container className="flex-grow-1 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white flex-md-row">
          <Col xs={5} md={3} lg={3} className="border-end px-0 bg-light flex-column h-100 d-flex">
            {channelsLoaded
              ? (
                  <ChannelsList />
                )
              : (
                  <div className="flex-grow-1 d-flex justify-content-center align-items-center">
                    <Spinner animation="border" variant="primary" />
                  </div>
                )}
          </Col>
          <Col className="d-flex flex-column p-0 h-100">
            <MessagesHeader channelId={currentChannelId} />
            {messagesLoaded
              ? (
                  <MessagesList channelId={currentChannelId} />
                )
              : (
                  <div className="flex-grow-1 d-flex justify-content-center align-items-center">
                    <Spinner animation="border" variant="primary" />
                  </div>
                )}
            <MessageInput channelId={currentChannelId} />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default HomePage
