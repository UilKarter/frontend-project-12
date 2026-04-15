const apiPath = '/api/v1'

export default {
  getChannels: () => [apiPath, 'channels'].join('/'),
  messagesPath: () => [apiPath, 'messages'].join('/'),
  authPath: () => [apiPath, 'login'].join('/'),
}
