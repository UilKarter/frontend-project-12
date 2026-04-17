import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../store/slices/modalSlice'
import AddChannelModal from './parts/channels/modals/AddChannelModal'
import RenameChannelModal from './parts/channels/modals/RenameChannelModal'
import RemoveChannelModal from './parts/channels/modals/RemoveChannelModal'

const ModalRoot = () => {
  const dispatch = useDispatch()
  const { isOpen, type, data } = useSelector(state => state.modal)

  const handleClose = () => dispatch(closeModal())

  if (!isOpen) return null

  switch (type) {
    case 'add':
      return <AddChannelModal show={isOpen} onHide={handleClose} />
    case 'rename':
      return <RenameChannelModal channel={data} show={isOpen} onHide={handleClose} />
    case 'remove':
      return <RemoveChannelModal channelId={data?.id} show={isOpen} onHide={handleClose} />
    default:
      return null
  }
}

export default ModalRoot
