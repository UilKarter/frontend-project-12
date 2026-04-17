import { useSelector } from 'react-redux'
import { channelsSelectors } from '../../../store/slices/channelsSlice'
import { useTranslation } from 'react-i18next'

const MessagesHeader = ({ channelId }) => {
  const { t } = useTranslation()
  const channel = useSelector(state =>
    channelsSelectors.selectById(state, channelId),
  )

  return (
    <div className="border-bottom p-3 bg-white">
      <b>
        {t('home.channels.hash')}
        {channel?.name || t('home.messages.emptyChName')}
      </b>
    </div>
  )
}

export default MessagesHeader
