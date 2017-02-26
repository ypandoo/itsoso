import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Main';
import Home from './components/Home';

import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import reducer from './reducers';

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const routes = (
    <Provider store = {store}>
        <Router history = {hashHistory}>
            <Route path = '/' component = { App }>
                <IndexRoute component = { Home } > </IndexRoute>
            </Route>
        </Router>
    </Provider>
)

/**
 *         <Route path='/case' component={CaseContainer}></Route>
        <Route path='/about' component={About}></Route>
        <Route path='/detail' component={Detail}></Route>
 */


// Render the main component into the dom
ReactDOM.render(routes, document.getElementById('app'));