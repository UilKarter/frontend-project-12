import { toast } from 'react-toastify'
import removeChannel from '../api/removeChannel'

const removeChannelAction = async (channelId, t) => {
  try {
    await removeChannel(channelId)
    toast.success(t('home.channels.actions.removeSuccess'))
  }
  catch (e) {
    console.error(e)
    toast.error(t('home.channels.actions.removeError'))
  }
}

export default removeChannelAction
