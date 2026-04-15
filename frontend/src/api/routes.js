const apiPath = '/api/v1'

export default {
  getChannels: () => [apiPath, 'channels'].join('/'),
  getMessages: () => [apiPath, 'messages'].join('/'),
  authPath: () => [apiPath, 'login'].join('/'),
}
