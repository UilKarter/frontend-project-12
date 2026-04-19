import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import useApi from '../../../../hooks/useApi'

const RemoveChannelModal = ({ channelId, show, onHide }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const api = useApi()
  const [isLoading, setIsLoading] = useState(false)

  const handleRemove = async () => {
    setIsLoading(true)
    try {
      await api.removeChannelAction(channelId, t, navigate)
      onHide()
    }
    catch (e) {
      console.error('Error removing channel', e)
      toast.error(t('home.channels.actions.removeError'))
    }
    finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('home.channels.modals.removeTitle')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('home.channels.modals.removeConfirmation')}</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={onHide}>
            {t('home.channels.modals.cancelButton')}
          </Button>
          <Button variant="danger" onClick={handleRemove} disabled={isLoading}>
            {isLoading ? '…' : t('home.channels.modals.removeButton')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default RemoveChannelModal
