import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import reducers from "../reducers/Reducer";
import {
    createActionBroadcaster,
    createActionDispatcher
} from "./middleware/ActionBroadcast";
import { LOGIN, LOGOUT, UPDATE_USER } from "../actions/Actions";
import loadState from "./LoadState";

const channel = new BroadcastChannel("nutritiontrackr");
const actionBroadcaster = createActionBroadcaster(channel);

const createStoreWithMiddleware = applyMiddleware(
    ReduxThunk,
    actionBroadcaster([LOGIN, LOGOUT, UPDATE_USER])
)(createStore);

const store = createStoreWithMiddleware(
    reducers,
    loadState(),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

channel.onmessage = createActionDispatcher(store.dispatch);

export default store;
