import removeChannel from '../api/removeChannel'
import { toast } from 'react-toastify'

const removeChannelAction = async (channelId) => {
  try {
    await removeChannel(channelId)
    toast.success('Канал удалён')
  }
  catch (e) {
    console.error(e)
    toast.error('В ходе удаления возникла ошибка')
  }
}

export default removeChannelAction
