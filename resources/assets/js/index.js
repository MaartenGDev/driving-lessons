import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux'
import configureStore from './store/configureStore';
import { loadQuestions } from './actions/questionActions'

const store = configureStore();
store.dispatch(loadQuestions())

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
