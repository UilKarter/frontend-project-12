import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import { toast } from 'react-toastify'

import { setChannels, setCurrentChannelId } from '../store/slices/channelsSlice'
import { setMessages } from '../store/slices/messagesSlice'

import appRoutes from '../routes/appRoutes'
import getChannels from '../api/getChannels'
import getMessages from '../api/getMessages'
import Header from '../components/parts/Header'
import ChannelsList from '../components/parts/channels/ChannelList'
import MessagesHeader from '../components/parts/messages/MessagesHeader'
import MessagesList from '../components/parts/messages/MessagesList'
import MessageInput from '../components/parts/messages/MessageInput'

const HomePage = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const currentChannelId = useSelector(state => state.channels.currentChannelId)
  const channels = useSelector(state => state.channels.entities)
  const [isLoading, setIsLoading] = useState(!Object.keys(channels).length)

  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading) return

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
        if (err?.response?.status === 401) {
          navigate(appRoutes.login)
          return
        }
        toast.error(t('home.messages.loadError'))
      }
      finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [dispatch, isLoading, navigate, t])

  if (isLoading) {
    return (
      <div className="d-flex flex-column h-100 bg-light">
        <Header />
        <div className="flex-grow-1 d-flex justify-content-center align-items-center">
          <Spinner animation="border" variant="primary" />
        </div>
      </div>
    )
  }

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
