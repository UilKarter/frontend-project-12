import { useSelector } from 'react-redux'
import { channelsSelectors } from '../../../store/slices/channelsSlice'

const MessagesHeader = ({ channelId }) => {
  const channel = useSelector(state =>
    channelsSelectors.selectById(state, channelId),
  )

  return (
    <div className="border-bottom p-3 bg-white">
      <b>
        #
        {channel?.name || 'home.messages.emptyChName'}
      </b>
    </div>
  )
}

export default MessagesHeader
