import { toast } from 'react-toastify'
import postChannel from '../api/postChannel'
import { addChannel, setCurrentChannelId } from '../store/slices/channelsSlice'

const postChannelAction = async (closeModal, dispatch, values, { resetForm }, t) => {
  try {
    const newChannel = await postChannel(values.name)

    dispatch(addChannel(newChannel))
    dispatch(setCurrentChannelId(newChannel.id))

    resetForm()
    closeModal()

    toast.success(t('home.channels.actions.createSuccess'))
  }
  catch (e) {
    console.error(e)
    toast.error(t('home.channels.actions.createError'))
    throw e
  }
}

export default postChannelAction
