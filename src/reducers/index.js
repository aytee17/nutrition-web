import { combineReducers } from "redux";
import SearchTermReducer from "./reducer_search_term";
import IngredientsReducer from "./reducer_ingredients";
import TempMeal from "./reducer_temp_meal";
import UserReducer from "./reducer_user";
import MealsReducer from "./reducer_meals";
import { LOGOUT } from "../actions/actions";

const appReducer = combineReducers({
	user: UserReducer,
	search: SearchTermReducer,
	ingredients: IngredientsReducer,
	meals: MealsReducer,
	tempMeal: TempMeal
});

const rootReducer = (state, action) => {
	if (action.type == LOGOUT) {
		state = undefined;
	}
	return appReducer(state, action);
}

export default rootReducer;
