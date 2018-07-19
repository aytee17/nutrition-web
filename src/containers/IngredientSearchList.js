import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SearchList from "../components/SearchList";

import {
	updateSearchTerm,
	clearSearchTerm,
	getIngredients,
	hoverIngredient,
	addIngredient,
	clearActiveIngredient
} from "../actions/index";

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			updateSearchTerm,
			clearSearchTerm,
			getItems: getIngredients,
			hoverItem: hoverIngredient,
			addItem: addIngredient,
			clearActiveItem: clearActiveIngredient,
		},
		dispatch
	);
}

function mapStateToProps(state) {
	const { activeItem, items, order } = state.ingredients;
	const { searchTerm } = state.search.term;
	return { searchTerm, activeItem, items, order };
}

const IngredientSearchList = connect(mapStateToProps, mapDispatchToProps)(SearchList);

export default IngredientSearchList;

// Move these into container for mini-form-for-list-item
//updateAmount,
//readySubmit,