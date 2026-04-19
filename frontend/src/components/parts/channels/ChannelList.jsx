import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { ListGroup, Button } from 'react-bootstrap'

import { channelsSelectors, setCurrentChannelId } from '../../../store/slices/channelsSlice'
import { openModal } from '../../../store/slices/modalSlice'

import BasicChannel from './BasicChannel'
import CustomChannel from './CustomChannel'

const ChannelsList = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const channels = useSelector(channelsSelectors.selectAll)
  const currentChannelId = useSelector(state => state.channels.currentChannelId)

  const handleAddChannel = () => dispatch(openModal({ type: 'add' }))
  const basicChannels = channels.filter(ch => !ch.removable)
  const customChannels = channels.filter(ch => ch.removable)

  const handleChannelClick = (channelId) => {
    dispatch(setCurrentChannelId(channelId))
  }

  return (
    <div className="d-flex flex-column h-100">
      <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
        <b>{t('home.channels.header')}</b>
        <Button
          variant="outline-primary"
          size="sm"
          onClick={handleAddChannel}
          title={t('home.channels.add')}
          aria-label={t('home.channels.add')}
        >
          {t('home.channels.plus')}
        </Button>
      </div>
      <div className="overflow-auto flex-grow-1">
        <ListGroup variant="flush">
          {basicChannels.map(ch => (
            <BasicChannel
              key={ch.id}
              channel={ch}
              isActive={ch.id === currentChannelId}
              onClick={() => handleChannelClick(ch.id)}
            />
          ))}
          {customChannels.map(ch => (
            <CustomChannel
              key={ch.id}
              channel={ch}
              isActive={ch.id === currentChannelId}
              onClick={() => handleChannelClick(ch.id)}
            />
          ))}
        </ListGroup>
      </div>
    </div>
  )
}

export default ChannelsList
