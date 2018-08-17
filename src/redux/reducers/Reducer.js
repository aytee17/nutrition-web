import { combineReducers } from "redux";
import UserReducer from "./UserReducer";
import MealsReducer from "./MealsReducer";
import { LOGOUT } from "../actions/Actions";

const appReducer = combineReducers({
    user: UserReducer,
    meals: MealsReducer
});

const rootReducer = (state, action) => {
    if (action.type == LOGOUT) {
        state = undefined;
    }
    return appReducer(state, action);
};

export default rootReducer;
