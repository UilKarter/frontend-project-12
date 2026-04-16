import { toast } from 'react-toastify'
import renameChannel from '../api/renameChannel'

const renameChannelAction = async (channelId, mame) => {
  try {
    await renameChannel(channelId, mame)
    toast.success('Канал изменён')
  }
  catch (e) {
    console.error(e)
    toast.error('Ошибка при изменении канала')
  }
}

export default renameChannelAction
