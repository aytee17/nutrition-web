import React from "react";
import SearchBar from "./SearchBar";
import List from "./List";
import { Input } from "./FormELements";

const SearchList = ({
	searchTerm,
	updateSearchTerm,
	getItems,
	activeItem,
	clearActiveItem,
	items,
	order,
	hoverItem,
	addItem,
	children
}) => (
	<div>
		<SearchBar
			{...{
				searchTerm,
				updateSearchTerm,
				getItems,
				hoverItem,
				activeItem,
				clearActiveItem,
				order,
				addItem
			}}
		/>
		<List
			{...{
				hoverItem,
				activeItem,
				clearActiveItem,
				items,
				order,
				children
			}}
		/>
	</div>
);

export default SearchList;
