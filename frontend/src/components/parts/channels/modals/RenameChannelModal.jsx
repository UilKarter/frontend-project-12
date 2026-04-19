import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Modal, Button, Form } from 'react-bootstrap'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'

import useApi from '../../../../hooks/useApi'
import renameChannelSchema from '../../../../utils/schemas/renameChannelSchema'
import { channelsSelectors } from '../../../../store/slices/channelsSlice'

const RenameChannelModal = ({ channel, show, onHide }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const api = useApi()
  const inputRef = useRef(null)
  const channels = useSelector(channelsSelectors.selectAll)
  const channelNames = channels.map(ch => ch.name)

  const formik = useFormik({
    initialValues: { name: channel.name },
    enableReinitialize: true,
    validationSchema: renameChannelSchema(channelNames, channel.name, t),
    onSubmit: async (values, helpers) => {
      try {
        await api.renameChannelAction(channel.id, values.name, t, navigate)
        onHide()
      }
      catch (e) {
        console.error('Error renaming channel', e)
        toast.error(t('home.channels.actions.renameError'))
      }
      finally {
        helpers.setSubmitting(false)
      }
    },
  })

  const handleEnter = () => {
    formik.resetForm({ values: { name: channel.name } })
    formik.setSubmitting(false)
    setTimeout(() => {
      inputRef.current?.focus()
      inputRef.current?.select()
    }, 0)
  }

  return (
    <Modal show={show} onHide={onHide} centered onEnter={handleEnter}>
      <Modal.Header closeButton>
        <Modal.Title>{t('home.channels.modals.renameTitle')}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <Form.Label className="visually-hidden">{t('home.channels.modals.nameLabel')}</Form.Label>
          <Form.Control
            name="name"
            ref={inputRef}
            placeholder={t('home.channels.modals.nameLabel')}
            aria-label={t('home.channels.modals.nameLabel')}
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete="off"
            isInvalid={
              (formik.touched.name || formik.submitCount > 0)
              && !!formik.errors.name
            }
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.name}
          </Form.Control.Feedback>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            {t('home.channels.modals.cancelButton')}
          </Button>
          <Button type="submit" variant="primary" disabled={formik.isSubmitting}>
            {t('home.channels.modals.saveButton')}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default RenameChannelModal
