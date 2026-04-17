import { toast } from 'react-toastify'
import signupReq from '../api/signupReq'
import { loginStart, loginSuccess, loginFailure } from '../store/slices/authSlice'
import { setToken, setUsername } from '../utils/auth'
import getChannels from '../api/getChannels'
import getMessages from '../api/getMessages'
import { setChannels, setCurrentChannelId } from '../store/slices/channelsSlice'
import { setMessages } from '../store/slices/messagesSlice'

const signupAction = async (navigate, dispatch, values, { setFieldError }, t) => {
  dispatch(loginStart())

  try {
    const { token, username } = await signupReq(values)
    setToken(token)
    setUsername(username)
    dispatch(loginSuccess({ token, username }))

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
      console.error(t('home.messages.loadError'), err)
      toast.error(t('home.messages.loadError'))
    }

    navigate('/')
  }
  catch (error) {
    if (error.response?.status === 409) {
      setFieldError('username', t('auth.errors.alreadyCreated'))
    }
    else {
      const message = t('auth.errors.serverError')
      dispatch(loginFailure(message))
      toast.error(message)
    }
  }
}

export default signupAction
