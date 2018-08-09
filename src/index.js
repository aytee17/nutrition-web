import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import reducers from "./reducers";
import { LOGIN, LOGOUT, UPDATE_USER } from "./actions/actions";

import SecureLS from "secure-ls";
import App from "./components/App";

const channel = new BroadcastChannel("nutritiontrackr");
const secureStorage = new SecureLS({ encodingType: "aes" });

function broadcastDispatch(actionTypes) {
    return () => next => action => {
        if (
            !(action.meta && action.meta._copy) &&
            actionTypes.includes(action.type)
        ) {
            channel.postMessage({ ...action, meta: { _copy: true } });
        }
        next(action);
    };
}

const createStoreWithMiddleware = applyMiddleware(
    ReduxThunk,
    broadcastDispatch([LOGIN, LOGOUT, UPDATE_USER])
)(createStore);

function loadState() {
    try {
        const state = secureStorage.get("state");
        if (state === "") return undefined;
        return state;
    } catch (error) {
        delete localStorage.state;
        delete localStorage._secure__ls__metadata;
        location.reload();
        return undefined;
    }
}

const store = createStoreWithMiddleware(
    reducers,
    loadState(),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function createMessageDispatcher(dispatch) {
    return message => {
        dispatch(message.data);
    };
}

channel.onmessage = createMessageDispatcher(store.dispatch);

const root = document.createElement("div");
root.id = "root";
root.setAttribute("style", "height:100%");
document.body.appendChild(root);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector("#root")
);
