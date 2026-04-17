import { useState, useRef } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import sendMessage from '../../../api/sendMessage'
import filter from '../../../utils/profanityFilter'

const MessageInput = ({ channelId }) => {
  const { t } = useTranslation()
  const [text, setText] = useState('')
  const [isSending, setIsSending] = useState(false)
  const inputRef = useRef(null)
  const username = localStorage.getItem('username')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return

    const cleanedMessage = filter.clean(trimmed)

    setIsSending(true)
    try {
      await sendMessage({
        body: cleanedMessage,
        channelId,
        username,
      })
      setText('')
      setTimeout(() => inputRef.current?.focus(), 0)
    }
    catch (err) {
      console.error(t('home.messages.submitError'), err)
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
          placeholder={t('home.messages.inputAwait')}
          disabled={isSending}
        />
        <Button type="submit" disabled={isSending}>
          {t('home.messages.submitButton')}
        </Button>
      </Form>
    </div>
  )
}

export default MessageInput
