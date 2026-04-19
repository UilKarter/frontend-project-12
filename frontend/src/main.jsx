import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

import i18n, { i18nPromise } from './i18n'
import App from './App'
import store from './store/store'
import { initSocket } from './socket'

const init = async () => {
  await i18nPromise

  initSocket({ dispatch: store.dispatch, t: i18n.t })

  createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </BrowserRouter>
    </Provider>,
  )
}

init()
