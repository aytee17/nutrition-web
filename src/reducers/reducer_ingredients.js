import {
	GET_INGREDIENTS,
	HOVER_INGREDIENT,
	UPDATE_AMOUNT,
	SET_READY,
	CLEAR_ACTIVE_INGREDIENT,
	CLEAR_INGREDIENTS
} from "../actions/actions";
import _ from "lodash";

export default function (
	state = { activeItem: {}, items: {}, order: [] },
	action
) {
	switch (action.type) {
		case GET_INGREDIENTS:
			return {
				activeItem: {},
				items: _.mapKeys(action.payload, "id"),
				order: action.payload.map((e) => e.id)
			};
		case CLEAR_INGREDIENTS:
			return { activeItem: {}, items: {}, order: [] };

		case HOVER_INGREDIENT:
		case UPDATE_AMOUNT:
		case SET_READY:
		case CLEAR_ACTIVE_INGREDIENT:
			return {
				...state,
				activeItem: activeIngredient(state.activeItem, action)
			};
		default:
			return state;
	}
}

function activeIngredient(
	state = { id: "", selected: false, amount: "", ready: false },
	action
) {
	switch (action.type) {
		case HOVER_INGREDIENT:
			return { id: action.payload, amount: "", ready: false };
		case UPDATE_AMOUNT:
			return { ...state, amount: action.payload };
		case SET_READY:
			return { ...state, ready: action.payload };
			/**
		case SET_SELECTED:
			return { ...state, selected: action.payload };
			**/
		case CLEAR_ACTIVE_INGREDIENT:
			return { id: "", selected: false, amount: "", ready: false };
		default:
			return state;
	}
}
