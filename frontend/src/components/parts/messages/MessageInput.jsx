import { useState, useRef } from 'react'
import { Form, Button } from 'react-bootstrap'
import sendMessage from '../../../api/sendMessage'

const MessageInput = ({ channelId }) => {
  const [text, setText] = useState('')
  const [isSending, setIsSending] = useState(false)
  const inputRef = useRef(null)
  const username = localStorage.getItem('username')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return

    setIsSending(true)
    try {
      await sendMessage({
        body: trimmed,
        channelId,
        username,
      })
      setText('')
      setTimeout(() => inputRef.current?.focus(), 0)
    }
    catch (err) {
      console.error('Ошибка отправки сообщения:', err)
    }
    finally {
      setIsSending(false)
      setTimeout(() => {
        inputRef.current?.focus()
      }, 10)
    }
  }

  return (
    <div className="border-top p-3 bg-white">
      <Form onSubmit={handleSubmit} className="d-flex gap-2">
        <Form.Control
          ref={inputRef}
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Введите сообщение..."
          disabled={isSending}
        />
        <Button type="submit" disabled={isSending}>
          Отправить
        </Button>
      </Form>
    </div>
  )
}

export default MessageInput
