import { toast } from 'react-toastify'
import removeChannel from '../api/removeChannel'
import appRoutes from '../routes/appRoutes'
import { removeToken, removeUsername } from '../utils/auth'

const removeChannelAction = async (channelId, t, navigate) => {
  try {
    await removeChannel(channelId)
    toast.success(t('home.channels.actions.removeSuccess'))
  }
  catch (e) {
    console.error(t('home.channels.actions.removeError'), e)
    if (e?.response?.status === 401) {
      removeToken()
      removeUsername()
      navigate(appRoutes.login)
      return
    }
    toast.error(t('home.channels.actions.removeError'))
  }
}

export default removeChannelAction
