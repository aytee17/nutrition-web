import { GET_MEALS } from '../actions/actions';

const defaultState = {
	meals: null,
	allIngredients: null,
	loaded: false
}

export default function (state = defaultState, action) {
	switch (action.type) {
		case GET_MEALS:
			return action.payload;
		default:
			return state;
	}	
}