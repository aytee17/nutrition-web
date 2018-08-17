import { LOGIN, LOGOUT, UPDATE_USER } from "../actions/Actions";

export default function(state = { loggedIn: false }, action) {
    switch (action.type) {
        case LOGIN:
            return action.payload;
        case LOGOUT:
            return { loggedIn: false };
        case UPDATE_USER:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}
