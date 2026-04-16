import { Modal, Button } from 'react-bootstrap'
import removeChannelAction from '../../../../actions/removeChannelAction'

const RemoveChannelModal = ({
  channelId,
  isOpen,
  setIsOpen,
}) => {
  const handleRemove = async () => {
    await removeChannelAction(channelId)
    setIsOpen(false)
  }

  return (
    <Modal show={isOpen} onHide={() => setIsOpen(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Вы уверены?</p>
        <div className="d-flex justify-content-end">
          <Button
            variant="secondary"
            className="me-2"
            onClick={() => setIsOpen(false)}
          >
            Отмена
          </Button>

          <Button
            variant="danger"
            onClick={handleRemove}
          >
            Удалить
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default RemoveChannelModal
