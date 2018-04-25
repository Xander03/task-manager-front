import React from 'react';
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {routes} from "./routes";
import {history, store} from "./store";
import {ConnectedRouter} from "react-router-redux";

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            {routes}
        </ConnectedRouter>
    </Provider>
, document.getElementById('root'));
