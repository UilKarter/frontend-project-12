import { toast } from 'react-toastify'
import renameChannel from '../api/renameChannel'
import filter from '../utils/profanityFilter'
import appRoutes from '../routes/appRoutes'
import { removeToken, removeUsername } from '../utils/auth'

const renameChannelAction = async (channelId, name, t, navigate) => {
  try {
    const cleanedName = filter.clean(name)
    await renameChannel(channelId, cleanedName)
    toast.success(t('home.channels.actions.renameSuccess'))
  }
  catch (e) {
    console.error(t('home.channels.actions.renameError'), e)
    if (e?.response?.status === 401) {
      removeToken()
      removeUsername()
      navigate(appRoutes.login)
      return
    }
    toast.error(t('home.channels.actions.renameError'))
  }
}

export default renameChannelAction
