import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, ListGroup, Form, Button } from 'react-bootstrap'

import getChannels from '../api/getChannels'
import getMessages from '../api/getMessages'
import sendMessage from '../api/sendMessage'

import socket from '../socket'

import { setChannels, setCurrentChannelId, channelsSelectors } from '../store/slices/channelsSlice'
import { setMessages, messagesSelectors, postMessage } from '../store/slices/messagesSlice'

const HomePage = () => {
  const dispatch = useDispatch()
  const [text, setText] = useState('')
  const [isSending, setIsSending] = useState(false)
  const channels = useSelector(channelsSelectors.selectAll)
  const messages = useSelector(messagesSelectors.selectAll)
  const currentChannelId = useSelector(state => state.channels.currentChannelId)
  const username = localStorage.getItem('username')

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
      }
    }

    fetchData()
  }, [dispatch])
  useEffect(() => {
    socket.on('newMessage', (payload) => {
      dispatch(postMessage(payload))
    })

    return () => {
      socket.off('newMessage')
    }
  }, [dispatch])

  const filteredMessages = messages.filter(
    msg => String(msg.channelId) === String(currentChannelId),
  )

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!text.trim()) return

    setIsSending(true)

    try {
      await sendMessage({
        body: text,
        channelId: currentChannelId,
        username,
      })

      setText('')
    }
    catch (err) {
      console.error(err)
    }
    finally {
      setIsSending(false)
    }
  }

  return (
    <div className="d-flex flex-column h-100">
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white">
          <Col xs={4} md={3} className="border-end bg-light p-0 d-flex flex-column">
            <div className="p-3 border-bottom">
              <b>Каналы</b>
            </div>
            <ListGroup variant="flush">
              {channels.map(ch => (
                <ListGroup.Item
                  key={ch.id}
                  active={ch.id === currentChannelId}
                  action
                  onClick={() => dispatch(setCurrentChannelId(ch.id))}
                >
                  {ch.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col className="d-flex flex-column p-0">
            <div className="border-bottom p-3">
              <b>Сообщения</b>
            </div>
            <div className="flex-grow-1 overflow-auto p-3">
              {filteredMessages.map(msg => (
                <div key={msg.id} className="mb-2">
                  <b>{msg.username}</b>
                  {': '}
                  {msg.body}
                </div>
              ))}
            </div>
            <div className="border-top p-3">
              <Form onSubmit={handleSubmit} className="d-flex gap-2">
                <Form.Control
                  value={text}
                  onChange={e => setText(e.target.value)}
                  placeholder="Введите сообщение..."
                />
                <Button
                  type="submit"
                  disabled={isSending}
                >
                  Отправить
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default HomePage
