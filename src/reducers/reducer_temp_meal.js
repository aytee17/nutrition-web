import { ADD_INGREDIENT } from '../actions/actions';

export default function (state = [], action) {
	switch(action.type) {
		case ADD_INGREDIENT:
			return [...state, action.payload];
		default:
			return state;
	}
}