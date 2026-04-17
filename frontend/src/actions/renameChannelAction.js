import { toast } from 'react-toastify'
import renameChannel from '../api/renameChannel'

const renameChannelAction = async (channelId, name, t) => {
  try {
    await renameChannel(channelId, name)
    toast.success(t('home.channels.actions.renameSuccess'))
  }
  catch (e) {
    console.error(e)
    toast.error(t('home.channels.actions.renameError'))
  }
}

export default renameChannelAction
