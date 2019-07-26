/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-filename-extension */
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import ReduxThunk from 'redux-thunk'
import { createBrowserHistory } from 'history'
import { Router } from 'react-router-dom'
import Loading from 'components/Loading'
import Intl from './intl'
import reducers from './reducers'
import Routes from './routes'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/style.css'


export const history = createBrowserHistory()

const componentEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(reducers, {}, componentEnhancers(applyMiddleware(ReduxThunk)))

const jsx = (
  <Provider store={store}>
    <Intl>
      <Suspense fallback={<Loading />}>
        <Router history={history}>
          <Routes />
        </Router>
      </Suspense>
    </Intl>
  </Provider>
)

const hasRendered = false

const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('root'))
  }
}

ReactDOM.render(<Loading />, document.getElementById('root'))
const url = new URL(window.location.href)
const token = localStorage.getItem('todoToken')
const username = localStorage.getItem('todoUsername')
if (token && username) {
  store.dispatch({
    type: 'TOKEN_LOGIN',
    payload: {
      token,

    }
  })
  if (history.location.pathname === '/auth' || history.location.pathname === '/') {
    renderApp()
    history.push('/home')
  } else {
    renderApp()
    history.push({ pathname: history.location.pathname, search: url.search })
  }
} else {
  renderApp()
  history.push({ pathname: history.location.pathname, search: url.search })
}
