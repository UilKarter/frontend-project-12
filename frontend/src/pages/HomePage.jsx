import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, ListGroup, Form } from 'react-bootstrap'

import getChannels from '../api/getChannels'
import getMessages from '../api/getMessages'

import { setChannels } from '../store/slices/channelsSlice'
import { setMessages } from '../store/slices/messagesSlice'

const HomePage = () => {
  const dispatch = useDispatch()

  const channels = useSelector(state =>
    state.channels.ids.map(id => state.channels.entities[id]),
  )

  const messages = useSelector(state =>
    state.messages.ids.map(id => state.messages.entities[id]),
  )

  useEffect(() => {
    const fetchData = async () => {
      try {
        const channelsData = await getChannels()
        const messagesData = await getMessages()

        dispatch(setChannels(channelsData))
        dispatch(setMessages(messagesData))
      }
      catch (err) {
        console.error('Ошибка загрузки данных:', err)
      }
    }

    fetchData()
  }, [dispatch])

  return (
    <div className="d-flex flex-column h-100">
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white">

          {/* CHANNELS */}
          <Col xs={4} md={3} className="border-end bg-light p-0 d-flex flex-column">
            <div className="p-3 border-bottom">
              <b>Каналы</b>
            </div>

            <ListGroup variant="flush">
              {channels.map(ch => (
                <ListGroup.Item key={ch.id}>
                  {ch.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>

          {/* MESSAGES */}
          <Col className="d-flex flex-column p-0">

            <div className="border-bottom p-3">
              <b>Сообщения</b>
            </div>

            <div className="flex-grow-1 overflow-auto p-3">
              {messages.map(msg => (
                <div key={msg.id} className="mb-2">
                  <b>{msg.username}</b>
                  {': '}
                  {msg.body}
                </div>
              ))}
            </div>

            <div className="border-top p-3">
              <Form.Control
                type="text"
                placeholder="Введите сообщение..."
              />
            </div>

          </Col>

        </Row>
      </Container>
    </div>
  )
}

export default HomePage
