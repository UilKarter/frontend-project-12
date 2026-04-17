import { toast } from 'react-toastify'
import renameChannel from '../api/renameChannel'
import filter from '../utils/profanityFilter'

const renameChannelAction = async (channelId, name, t) => {
  try {
    const cleanedName = filter.clean(name)
    await renameChannel(channelId, cleanedName)
    toast.success(t('home.channels.actions.renameSuccess'))
  }
  catch (e) {
    console.error(e)
    toast.error(t('home.channels.actions.renameError'))
  }
}

export default renameChannelAction
