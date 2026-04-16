import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { messagesSelectors } from '../../../store/slices/messagesSlice'

const MessagesList = ({ channelId }) => {
  const messages = useSelector(messagesSelectors.selectAll)
  const bottomRef = useRef(null)

  const filteredMessages = messages.filter(
    msg => String(msg.channelId) === String(channelId),
  )
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [filteredMessages.length])

  return (
    <div className="flex-grow-1 overflow-auto p-3 bg-white">
      {filteredMessages.map(msg => (
        <div key={msg.id} className="mb-2 text-break">
          <b>{msg.username}</b>
          {': '}
          {msg.body}
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  )
}

export default MessagesList
