import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import App from './App';
import reducers from './reducers'
import 'antd/dist/antd.css'
import { NextUIProvider } from '@nextui-org/react';
import { BrowserRouter as Router } from 'react-router-dom';

const store = createStore(reducers, compose(applyMiddleware(thunk)))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <React.StrictMode>
        <Provider store={store}>
          <NextUIProvider>
              <App />
          </NextUIProvider>
        </Provider>
    </React.StrictMode>
  </Router>
);

// now our components can dispatch actions to the store and can update store too
