import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { Modal, Button, Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import postChannelAction from '../../../../actions/postChannelAction'
import { channelsSelectors } from '../../../../store/slices/channelsSlice'
import postChannelSchema from '../../../../utils/schemas/postChannelSchema'
import filter from '../../../../utils/profanityFilter'

const AddChannelModal = ({ show, onHide }) => {
  const { t } = useTranslation()
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
        const cleanedName = filter.clean(values.name)
        await postChannelAction(() => onHide(), dispatch, { name: cleanedName }, helpers, t)
      }
      catch (e) {
        console.error(e)
      }
      finally {
        helpers.setSubmitting(false)
      }
    },
  })

  useEffect(() => {
    if (show) {
      formik.resetForm()
      formik.setSubmitting(false)
      setTimeout(() => inputRef.current?.focus(), 0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show])

  return (
    <Modal show={show} onHide={onHide} centered>
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
                (formik.touched.name || formik.submitCount > 0) && !!formik.errors.name
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
