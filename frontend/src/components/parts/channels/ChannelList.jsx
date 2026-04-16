import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ListGroup, Button } from 'react-bootstrap'

import { channelsSelectors, setCurrentChannelId } from '../../../store/slices/channelsSlice'

import BasicChannel from './BasicChannel'
import CustomChannel from './CustomChannel'
import AddChannelModal from './modals/AddChannelModal'

const ChannelsList = () => {
  const dispatch = useDispatch()
  const channels = useSelector(channelsSelectors.selectAll)
  const currentChannelId = useSelector(state => state.channels.currentChannelId)
  const [showAddModal, setShowAddModal] = useState(false)
  const basicChannels = channels.filter(ch => !ch.removable)
  const customChannels = channels.filter(ch => ch.removable)

  const handleChannelClick = (channelId) => {
    dispatch(setCurrentChannelId(channelId))
  }

  return (
    <div className="d-flex flex-column h-100">
      <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
        <b>Каналы</b>
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() => {
            console.log('Кнопка нажата, showAddModal =', showAddModal)
            setShowAddModal(true)
          }}
        >
          +
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
      {console.log('Рендер ChannelsList, showAddModal =', showAddModal)}
      <AddChannelModal show={showAddModal} onHide={() => setShowAddModal(false)} />
    </div>
  )
}

export default ChannelsList
