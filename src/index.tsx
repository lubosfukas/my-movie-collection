/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { applyMiddleware, createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleWare from 'redux-saga'

import App from './App'
import moviesReducer from './modules/movies/reducer'
import moviesSaga from './modules/movies/sagas'

const composeEnhancers = ((window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose) || compose
const sagaMiddleWare = createSagaMiddleWare()
const store = createStore(moviesReducer, composeEnhancers(applyMiddleware(sagaMiddleWare)))

const app = (
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
)

sagaMiddleWare.run(moviesSaga)
ReactDOM.render(app, document.getElementById('root'))
