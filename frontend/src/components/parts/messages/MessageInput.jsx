import { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import sendMessage from '../../../api/sendMessage'
import filter from '../../../utils/profanityFilter'
import { getUsername } from '../../../utils/auth'

const MessageInput = ({ channelId }) => {
  const { t } = useTranslation()
  const [text, setText] = useState('')
  const [isSending, setIsSending] = useState(false)
  const inputRef = useRef(null)
  const username = getUsername()

  useEffect(() => {
    inputRef.current?.focus()
  }, [channelId])

  useLayoutEffect(() => {
    if (!isSending) {
      inputRef.current?.focus()
    }
  }, [isSending])

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
    }
    catch (err) {
      console.error(t('home.messages.submitError'), err)
    }
    finally {
      setIsSending(false)
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
          autoComplete="off"
          aria-label={t('home.messages.newMessage')}
        />
        <Button type="submit" disabled={isSending}>
          {t('home.messages.submitButton')}
        </Button>
      </Form>
    </div>
  )
}

export default MessageInput
