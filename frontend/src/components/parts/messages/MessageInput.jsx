import { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import useApi from '../../../hooks/useApi'
import filter from '../../../utils/profanityFilter'
import appRoutes from '../../../routes/appRoutes'
import { removeToken, removeUsername } from '../../../utils/auth'

const MessageInput = ({ channelId }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const api = useApi()
  const [text, setText] = useState('')
  const [isSending, setIsSending] = useState(false)
  const inputRef = useRef(null)
  const username = useSelector(state => state.auth.username)

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
      await api.sendMessage({
        body: cleanedMessage,
        channelId,
        username,
      })
      setText('')
    }
    catch (err) {
      console.error(t('home.messages.submitError'), err)
      if (err?.response?.status === 401) {
        removeToken()
        removeUsername()
        navigate(appRoutes.login)
        return
      }
      toast.error(t('home.messages.submitError'))
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
