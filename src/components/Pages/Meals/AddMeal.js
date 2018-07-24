import React, { Component, Fragment } from "react";
import style from "./AddMeal.scss";
import cs from "classnames";
import _ from "lodash";
import { http, keys } from "../../../Utility";
import { Button, InputList, Input, Label, SmallLabel } from "../../UI/Inputs";
import { AddIcon, CloseIcon } from "../../Icons/Icons";
import { Pane, Horizontal } from "../../Templates/Templates";
import SearchList from "../../SearchList/SearchList";
import DraggableList from "../../DraggableList/DraggableList";

export default class AddMeal extends Component {
	constructor(props) {
		super(props);
		this.state = this.defaultState = {
			active: false,
			title: "",
			serves: 1,
			ingredients: {},
			order: [],
			inputRefs: {}
		};
		this.searchBar = React.createRef();
	}

	open = event => this.setState({ active: true });

	close = event => this.setState(this.defaultState);

	updateValue = event =>
		this.setState({ [event.target.name]: event.target.value });

	updateServes = event => {
		let { value } = event.target;
		if (value.length == 0) {
			value = "";
		} else if (value < 1) {
			value = 1;
		} else if (value.length > 2) {
			return;
		}
		this.setState({ serves: value });
	};

	onServingsBlur = event => {
		if (this.state.serves === "") {
			this.setState({ serves: this.defaultState.serves });
		}
	};

	createIngredientFetcher = responseHandler => searchTerm => {
		const endpoint = `/ingredients?q=${searchTerm}`;
		http.get(endpoint).then(response => responseHandler(response.data));
	};

	addIngredient = ingredient => {
		const exists = this.state.ingredients[ingredient.id];
		if (exists) {
			exists.ref.current.select();
		} else {
			this.setState({
				order: [...this.state.order, ingredient.id],
				ingredients: {
					...this.state.ingredients,
					[ingredient.id]: { ...ingredient, ref: React.createRef() }
				}
			});
		}
	};

	focusSearchBar = () => this.searchBar.current.focus();

	render() {
		const { active, title, serves, ingredients, order } = this.state;
		return (
			<Horizontal style={{ justifyContent: "flex-start" }}>
				<div>
					<Button
						pressed={active}
						disabled={active}
						onClick={this.open}
					>
						<AddIcon />
					</Button>
				</div>
				{active && (
					<div>
						<Pane
							style={{
								padding: "0.7rem",
								marginLeft: "0.5rem",
								position: "relative"
							}}
							fade
						>
							<CloseIcon
								className={style["close"]}
								onClick={this.close}
							/>
							<div className={style["top"]}>
								<Input
									name="title"
									value={title}
									onChange={this.updateValue}
									onKeyDown={this.completeValue}
									placeholder="Meal name"
									autoFocus
									noLabel
									style={{
										fontSize: "1.1rem",
										height: "3.04rem"
									}}
								/>
								<Input
									name="serves"
									style={{
										width: "4rem",
										paddingTop: "19px"
									}}
									value={serves}
									onFocus={event => event.target.select()}
									onChange={this.updateServes}
									onKeyDown={this.completeValue}
									onBlur={this.onServingsBlur}
									type="number"
									min={1}
									max={99}
									number
									noUnits
								>
									<Label>Serves</Label>
								</Input>
							</div>
							<div className={style["section"]}>
								<strong>Ingredients</strong>
								<div className={style["list"]}>
									<DraggableList
										order={order}
										items={ingredients}
										setItemOrder={items =>
											this.setState({
												order: items
											})
										}
										itemComponent={IngredientListItem}
										componentProps={{
											focusSearchBar: this.focusSearchBar
										}}
									/>
								</div>
								<SearchList
									addToList={this.addIngredient}
									createItemFetcher={
										this.createIngredientFetcher
									}
									ref={this.searchBar}
								/>
							</div>
						</Pane>
					</div>
				)}
			</Horizontal>
		);
	}
}

const IngredientListItem = ({
	isDragging,
	item: ingredient,
	focusSearchBar
}) => {
	const classNames = cs(style["list-item"], {
		[style["dragging"]]: isDragging
	});
	
	let units = ingredient.units;
	units = units === "amount" ? "x" : units;

	const onKeyDown = event => {
		if (event.keyCode === keys.ENTER) {
			focusSearchBar();
		}
	}

	return (
		<div className={classNames}>
			<div className={style["amount"]}>
				<input
					className={style["input-amount"]}
					ref={ingredient.ref}
					onKeyDown={onKeyDown}
					autoFocus
				/>
				<div>{units}</div>
			</div>
			{ingredient.name}
		</div>
	);
};
