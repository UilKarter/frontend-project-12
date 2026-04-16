import { toast } from 'react-toastify'
import postChannel from '../api/postChannel'
import { setCurrentChannelId, addChannel } from '../store/slices/channelsSlice'

const postChannelAction = async (
  closeModal,
  dispatch,
  values,
  { resetForm },
) => {
  try {
    const newChannel = await postChannel(values.name)

    dispatch(addChannel(newChannel))
    dispatch(setCurrentChannelId(newChannel.id))

    resetForm()
    closeModal()

    toast.success('Канал создан')
  }
  catch (e) {
    console.error(e)
    toast.error('В ходе создания канала возникла ошибка')
    throw e
  }
}

export default postChannelAction
