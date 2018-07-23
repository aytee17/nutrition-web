import React, { PureComponent } from "react";
import _ from "lodash";
import SearchBar from "./SearchBar";
import List from "./List";

export default class SearchList extends PureComponent {
	constructor(props) {
		super(props);
		this.state = this.defaultState = {
			searchTerm: "",
			activeItem: undefined,
			items: {},
			order: []
		};
		this.searchBar = React.createRef();

		const itemHandler = items => {
			if (items.length > 0) {
				this.setState({
					items: _.mapKeys(items, "id"),
					order: items.map(item => item.id),
					activeItem: items[0].id
				});
			}
		};
		this.fetchItems = this.props.createItemFetcher(itemHandler);
	}

	updateSearchTerm = searchTerm => this.setState({ searchTerm });

	runSearch = searchTerm => {
		if (searchTerm === "") {
			this.setState(this.defaultState);
			return;
		}
		this.fetchItems(searchTerm);
	};

	setActiveItem = id => this.setState({ activeItem: id });

	clearActiveItem = () => this.setState({ activeItem: undefined });

	addActiveItem = details => {
		console.log("add");
		const { items, activeItem } = this.state;
		this.setState(this.defaultState);
		this.searchBar.current.focus();
		this.props.addToList(items[activeItem], () => this.searchBar.current.focus());
	};

	render() {
		const { searchTerm, activeItem, items, order } = this.state;
		const {
			updateSearchTerm,
			runSearch,
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
						runSearch,
						setActiveItem,
						activeItem,
						clearActiveItem,
						order,
						addActiveItem,
						ref: this.searchBar
					}}
				/>
				<List
					{...{
						setActiveItem,
						activeItem,
						clearActiveItem,
						addActiveItem,
						items,
						order
					}}
				/>
			</div>
		);
	}
}