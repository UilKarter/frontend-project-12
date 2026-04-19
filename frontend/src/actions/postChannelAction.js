import { toast } from 'react-toastify'
import postChannel from '../api/postChannel'
import filter from '../utils/profanityFilter'
import appRoutes from '../routes/appRoutes'
import { removeToken, removeUsername } from '../utils/auth'
import { setCurrentChannelId } from '../store/slices/channelsSlice'

const postChannelAction = async (closeModal, dispatch, values, { resetForm }, t, navigate) => {
  try {
    const cleanedName = filter.clean(values.name)
    const newChannel = await postChannel(cleanedName)

    resetForm()
    closeModal()
    dispatch(setCurrentChannelId(newChannel.id))

    toast.success(t('home.channels.actions.createSuccess'))
  }
  catch (e) {
    console.error(t('home.channels.actions.createError'), e)
    if (e?.response?.status === 401) {
      removeToken()
      removeUsername()
      navigate(appRoutes.login)
      return
    }
    toast.error(t('home.channels.actions.createError'))
  }
}

export default postChannelAction
