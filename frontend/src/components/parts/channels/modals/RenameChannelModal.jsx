import { useFormik } from 'formik'
import { useEffect, useRef } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import renameChannelAction from '../../../../actions/renameChannelAction'
import renameChannelSchema from '../../../../utils/schemas/renameChannelSchema'
import { channelsSelectors } from '../../../../store/slices/channelsSlice'

const RenameChannelModal = ({
  channel,
  isOpen,
  setIsOpen,
}) => {
  const inputRef = useRef()
  const channels = useSelector(channelsSelectors.selectAll)
  const channelsNames = channels.map(ch => ch.name)
  const formik = useFormik({
    initialValues: {
      name: channel.name,
    },
    enableReinitialize: true,
    validationSchema: renameChannelSchema(channelsNames, channel.name),

    onSubmit: async (values, helpers) => {
      try {
        await renameChannelAction(channel.id, values.name)
        setIsOpen(false)
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
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus()
        inputRef.current?.select()
      }, 0)
    }
  }, [isOpen])

  return (
    <Modal show={isOpen} onHide={() => setIsOpen(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Переименовать канал</Modal.Title>
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
              (formik.touched.name || formik.submitCount > 0)
              && !!formik.errors.name
            }
          />

          <Form.Control.Feedback type="invalid">
            {formik.errors.name}
          </Form.Control.Feedback>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setIsOpen(false)}
          >
            Отмена
          </Button>

          <Button
            type="submit"
            variant="primary"
            disabled={formik.isSubmitting}
          >
            Сохранить
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default RenameChannelModal
