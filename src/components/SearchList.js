import React, { Component } from "react";
import _ from "lodash";
import SearchBar from "./SearchBar";
import List from "./List";
import { Input } from "./FormElements";
import { http } from "../Utility";

export default class SearchList extends Component {
	constructor(props) {
		super(props);
		this.state = this.defaultState = {
			searchTerm: "",
			activeItem: undefined,
			items: {},
			order: []
		};
	}

	updateSearchTerm = searchTerm => this.setState({ searchTerm });

	getItems = searchTerm => {
		if (searchTerm === "") {
			this.setState(this.defaultState);
			return;
		}
		const endpoint = `/ingredients?q=${searchTerm}`;
		http.get(endpoint).then(response => {
			const items = response.data;
			if (items.length > 0) {
				this.setState({
					items: _.mapKeys(items, "id"),
					order: items.map(item => item.id),
					activeItem: items[0].id
				});
			}
		});
	};

	setActiveItem = id => this.setState({ activeItem: id });

	clearActiveItem = () => this.setState({ activeItem: undefined });

	addActiveItem = () => {};

	/* updateAmount, readySubmit */

	render() {
		const { searchTerm, activeItem, items, order } = this.state;
		const {
			updateSearchTerm,
			getItems,
			setActiveItem,
			clearActiveItem,
			addActiveItem
		} = this;
		return (
			<div>
				<SearchBar
					{...{
						searchTerm,
						updateSearchTerm,
						getItems,
						setActiveItem,
						activeItem,
						clearActiveItem,
						order,
						addActiveItem
					}}
				/>
				<List
					{...{
						setActiveItem,
						activeItem,
						clearActiveItem,
						items,
						order
					}}
				/>
			</div>
		);
	}
}
