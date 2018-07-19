import React from "react";
import style from "../style/main.scss"

export const Input = ({ onChange, onSubmit, value, postLabel }) => (
	<div className={style["prompt"]}>
		<input
			className={style["amount-input"]}
			type="text"
			value={this.props.amount}
			onChange={this.props.onChange}
			onKeyDown={this.props.onSubmit}
			autoFocus
		/>
		{" " + postLabel}
	</div>
);

export const Button = ({ children }) => (
	<button type="button" class={style["add-button"]}>{children}</button>
);

			/**
	// refactor to prop argument 
	onInputChange = event => {
		const value = event.target.value;
		if (!isNaN(value) && value.length < 6 && value[0] !== "0") {
			this.props.updateAmount(value);
			this.props.readySubmit(value > 0 ? true : false);
		}
	};

	// refactor to prop argument
	submitItem() {
		if (keyPressed === ENTER && activeItem.readyToSubmit) {
			this.props.clearIngredients();
			this.props.clearSearchTerm();
			this.props.readySubmit(false);
			this.props.addIngredient(this.props.list.activeItem);
		}
	}
	**/
		

		
