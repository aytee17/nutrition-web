import React, { Component } from "react";
import style from "../style/main.scss";

const ENTER = 13;
const UP = 38;
const DOWN = 40;

export default class SearchBar extends Component {
	constructor(props) {
		super(props);
		this.wait = null;
	}

	componentDidUpdate() {
		this.input.focus();
	}

	onInputChange = event => {
		const value = event.target.value;
		clearTimeout(this.wait);
		this.wait = setTimeout(() => {
			this.search(value);
		}, 250);
	}

	search(searchTerm) {
		this.props.updateSearchTerm(searchTerm);
		this.props.getItems(searchTerm);
	}

	onKeyDown = event => {
		const keyPressed = event.keyCode;
		if (keyPressed == UP || keyPressed == DOWN) {
			event.preventDefault();
			this.cycleItems(keyPressed);
		} else if (keyPressed == ENTER && this.props.activeItem.id) {
			this.props.addItem(this.props.activeItem);
		}
	}

	cycleItems(keyPressed) {
		const { order, hoverItem, activeItem, clearActiveItem } = this.props;

		if (!activeItem.id) {
			const id = keyPressed === UP ? order[order.length - 1] : order[0];
			hoverItem(id);
		} else {
			const activeIndex = order.findIndex(itemId => {
				return itemId === activeItem.id;
			});

			let nextIndex =
				keyPressed === UP ? activeIndex - 1 : activeIndex + 1;
			console.log("next index", nextIndex);

			if (nextIndex >= order.length || nextIndex < 0) {
				clearActiveItem();
			} else {
				hoverItem(order[nextIndex]);
			}
		}
	}

	render() {
		return (
			<input
				className={style["search-box"]}
				placeholder="Search for an ingredient"
				value={this.props.searchTerm}
				onChange={this.onInputChange}
				onKeyDown={this.onKeyDown}
				ref={input => {
					this.input = input;
				}}
				autoFocus
			/>
		);
	}
}
