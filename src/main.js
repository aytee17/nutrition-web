import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./components/App";
import store from "./redux/store/Store";
import style from "./main.scss";

const root = document.createElement("div");
root.id = "root";
root.setAttribute("style", "height:100%");
document.body.appendChild(root);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    root
);
