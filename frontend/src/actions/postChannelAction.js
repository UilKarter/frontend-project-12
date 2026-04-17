import { toast } from 'react-toastify'
import postChannel from '../api/postChannel'
import { addChannel, setCurrentChannelId } from '../store/slices/channelsSlice'
import filter from '../utils/profanityFilter'

const postChannelAction = async (closeModal, dispatch, values, { resetForm }, t) => {
  try {
    const cleanedName = filter.clean(values.name)
    const newChannel = await postChannel(cleanedName)

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
