import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Modal, Button, Form } from 'react-bootstrap'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'

import useApi from '../../../../hooks/useApi'
import { channelsSelectors } from '../../../../store/slices/channelsSlice'
import postChannelSchema from '../../../../utils/schemas/postChannelSchema'

const AddChannelModal = ({ show, onHide }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const api = useApi()
  const inputRef = useRef(null)
  const dispatch = useDispatch()

  const channels = useSelector(channelsSelectors.selectAll)
  const channelNames = channels.map(ch => ch.name)

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: postChannelSchema(channelNames, t),
    enableReinitialize: true,
    onSubmit: async (values, helpers) => {
      try {
        await api.postChannelAction(() => onHide(), dispatch, values, helpers, t, navigate)
      }
      catch (e) {
        console.error('Error creating channel', e)
        toast.error(t('home.channels.actions.createError'))
      }
      finally {
        helpers.setSubmitting(false)
      }
    },
  })

  const handleEnter = () => {
    formik.resetForm()
    formik.setSubmitting(false)
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  return (
    <Modal show={show} onHide={onHide} centered onEnter={handleEnter}>
      <Modal.Header closeButton>
        <Modal.Title>{t('home.channels.modals.postTitle')}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <Form.Group controlId="name" className="mb-3">
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
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            {t('home.channels.modals.cancelButton')}
          </Button>
          <Button type="submit" variant="primary" disabled={formik.isSubmitting}>
            {t('home.channels.modals.postButton')}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default AddChannelModal
