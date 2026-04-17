import loginReq from '../api/loginReq'
import { toast } from 'react-toastify'
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from '../store/slices/authSlice'
import { setToken, setUsername } from '../utils/auth'
import getChannels from '../api/getChannels'
import getMessages from '../api/getMessages'
import { setChannels, setCurrentChannelId } from '../store/slices/channelsSlice'
import { setMessages } from '../store/slices/messagesSlice'

const loginAction = async (navigate, dispatch, values, t) => {
  dispatch(loginStart())

  try {
    const data = await loginReq(values)
    const { token } = data
    const { username } = values

    if (!token) {
      throw new Error(t('auth.errors.noToken'))
    }

    setToken(token)
    setUsername(username)
    dispatch(loginSuccess({ token }))

    try {
      const [channelsData, messagesData] = await Promise.all([
        getChannels(),
        getMessages(),
      ])
      dispatch(setChannels(channelsData))
      dispatch(setMessages(messagesData))
      const general = channelsData.find(c => c.name === 'general')
      dispatch(setCurrentChannelId(general?.id || channelsData[0]?.id))
    }
    catch (err) {
      console.error(t('home.channels.loadError'), err)
      toast.error(t('home.messages.loadError'))
    }

    navigate('/')
  }
  catch (error) {
    const message = error.response?.status === 401
      ? t('auth.errors.wrongLogin')
      : t('auth.errors.serverError')
    dispatch(loginFailure(message))
    toast.error(message)
  }
}

export default loginAction
