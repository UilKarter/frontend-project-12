import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { Modal, Button, Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import renameChannelAction from '../../../../actions/renameChannelAction'
import renameChannelSchema from '../../../../utils/schemas/renameChannelSchema'
import { channelsSelectors } from '../../../../store/slices/channelsSlice'

const RenameChannelModal = ({ channel, show, onHide }) => {
  const { t } = useTranslation()
  const inputRef = useRef(null)
  const channels = useSelector(channelsSelectors.selectAll)
  const channelNames = channels.map(ch => ch.name)

  const formik = useFormik({
    initialValues: { name: channel.name },
    enableReinitialize: true,
    validationSchema: renameChannelSchema(channelNames, channel.name, t),
    onSubmit: async (values, helpers) => {
      try {
        await renameChannelAction(channel.id, values.name, t)
        onHide()
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
      formik.resetForm({ values: { name: channel.name } })
      formik.setSubmitting(false)
      setTimeout(() => {
        inputRef.current?.focus()
        inputRef.current?.select()
      }, 0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show])

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('home.channels.modals.renameTitle')}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <Form.Control
            name="name"
            ref={inputRef}
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
