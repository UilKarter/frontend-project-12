import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import i18next from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import resources from './locales/locales.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

import App from './App'
import store from './store/store'

const init = async () => {
  const i18n = i18next.createInstance()
  await i18n
    .use(initReactI18next)
    .init({
      fallbackLng: 'ru',
      lng: 'ru',
      debug: false,
      resources,
    })

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
