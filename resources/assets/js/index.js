import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux'
import configureStore from './store/configureStore';
import { loadExams } from './actions/examActions'

const store = configureStore();
store.dispatch(loadExams())

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
