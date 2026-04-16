const apiPath = '/api/v1'

export default {
  channelPath: () => [apiPath, 'channels'].join('/'),
  updateChannelPath: id => [apiPath, 'channels', id].join('/'),
  messagesPath: () => [apiPath, 'messages'].join('/'),
  authPath: () => [apiPath, 'login'].join('/'),
  signupPath: () => [apiPath, 'signup'].join('/'),
}
