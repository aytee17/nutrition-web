import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./components/App";
import store from "./redux/store/Store";
import style from "./main.scss";
import root from "./utils/Root";

document.body.appendChild(root);
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    root
);
