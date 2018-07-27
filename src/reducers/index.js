import { combineReducers } from "redux";
import UserReducer from "./reducer_user";
import MealsReducer from "./reducer_meals";
import { LOGOUT } from "../actions/actions";

const appReducer = combineReducers({
	user: UserReducer,
	meals: MealsReducer,
});

const rootReducer = (state, action) => {
	if (action.type == LOGOUT) {
		state = undefined;
	}
	return appReducer(state, action);
}

export default rootReducer;
