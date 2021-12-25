import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import App from './App';
import Provider from "react-redux/lib/components/Provider";
import { PersistGate } from 'redux-persist/integration/react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.css';
import "react-bootstrap";

import configureStore from './store'
const { store, persistor } = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ToastContainer className="toast" toastClassName="toast-wrapper" bodyClassName="toast-body" />
            <App/>
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);
