import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { createEpicMiddleware } from 'redux-observable';

// import 'bootstrap/dist/css/bootstrap.min.css';
// // import $ from 'jquery';
// // import Popper from 'popper.js';
// import 'bootstrap/dist/js/bootstrap.bundle.min';
// import 'materialize-css/dist/css/materialize.min.css'
// import 'materialize-css/sass/materialize.scss';


import './styles.scss';
import "materialize-css/dist/js/materialize.min.js";


import App from './App';
import reportWebVitals from './reportWebVitals';
import { rootReducer } from './redux/reducers';
import { rootEpic } from './redux/epics';

const epicMiddleware = createEpicMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      thunk,
      epicMiddleware
    )
  )
);

epicMiddleware.run(rootEpic);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
