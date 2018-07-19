import { UPDATE_SEARCH_TERM, CLEAR_SEARCH_TERM } from '../actions/actions';

export default function (state = { term: "" }, action) {
	switch (action.type) {
		case UPDATE_SEARCH_TERM:
			return { term: action.payload };
		case CLEAR_SEARCH_TERM:
			return { term: "" };
		default:
			return state;
	}
}
