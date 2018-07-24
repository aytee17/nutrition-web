import React, { Component, Fragment } from "react";
import style from "./AddMeal.scss";
import cs from "classnames";
import _ from "lodash";
import { http, keys } from "../../../Utility";
import { Button, InputList, Input, Label, SmallLabel } from "../../UI/Inputs";
import { AddIcon, CloseIcon } from "../../Icons/Icons";
import { Pane, Horizontal } from "../../Templates/Templates";
import Meter from "../../Meter/Meter";
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
			totalEnergy: 0,
			totalProtein: 0
		};
		this.searchBar = React.createRef();
	}

	open = event => this.setState({ active: true });

	close = event => this.setState(this.defaultState);

	updateTitle = event => this.setState({ title: event.target.value });

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
		const { ingredients, order, totalProtein, totalEnergy } = this.state;
		const exists = ingredients[ingredient.id];
		if (exists) {
			exists.ref.current.select();
		} else {
			this.setState(
				{
					order: [...order, ingredient.id],
					ingredients: {
						...ingredients,
						[ingredient.id]: {
							...ingredient,
							amount: 0,
							ref: React.createRef()
						}
					}
				},
				() => this.state.ingredients[ingredient.id].ref.current.select()
			);
		}
	};

	focusSearchBar = () => this.searchBar.current.focus();

	updateAmount = (id, amount) => {
		const ingredient = this.state.ingredients[id];
		const modifier = ingredient.units === "amount" ? amount : amount / 100;
		this.setState(
			{
				ingredients: {
					...this.state.ingredients,
					[id]: { ...ingredient, amount }
				}
			},
			() =>
				this.setState({
					totalProtein: this.accumulate("protein"),
					totalEnergy: this.accumulate("energy")
				})
		);
	};

	accumulate = attribute =>
		this.state.order
			.map(id => {
				const ingredient = this.state.ingredients[id];
				const { amount, units } = ingredient;
				const modifier = units === "amount" ? amount : amount / 100;
				return ingredient[attribute] * modifier;
			})
			.reduce((total, current) => total + current);

	render() {
		const {
			active,
			title,
			serves,
			ingredients,
			order,
			totalEnergy,
			totalProtein
		} = this.state;
		const { user } = this.props;
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
								padding: "1rem",
								marginLeft: "0.5rem",
								position: "relative"
							}}
							fade
						>
							<CloseIcon
								className={style["close"]}
								onClick={this.close}
							/>
							<Input
								name="title"
								value={title}
								onChange={this.updateTitle}
								placeholder="Meal name"
								autoFocus
								noLabel
							/>
							<div className={style["top"]}>
								<Input
									name="serves"
									style={{
										width: "4rem",
										paddingTop: "1.2rem"
									}}
									value={serves}
									onFocus={event => event.target.select()}
									onChange={this.updateServes}
									onBlur={this.onServingsBlur}
									type="number"
									min={1}
									max={99}
									number
									noUnits
								>
									<Label>Serves</Label>
								</Input>

								<Meter
									title="Energy"
									units="kJ"
									total={user.eer}
									amount={totalEnergy}
									color="#45b0e6"
								/>
								<Meter
									title="Protein"
									units="g"
									total={user.proteinRequirement}
									amount={totalProtein}
									color="#D32F2F"
								/>
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
											focusSearchBar: this.focusSearchBar,
											updateAmount: this.updateAmount
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
	focusSearchBar,
	updateAmount
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
	};

	return (
		<div className={classNames}>
			<div className={style["amount"]}>
				<input
					className={style["input-amount"]}
					ref={ingredient.ref}
					value={ingredient.amount}
					onChange={event =>
						updateAmount(ingredient.id, event.target.value)
					}
					onKeyDown={onKeyDown}
				/>
				<div>{units}</div>
			</div>
			{ingredient.name}
		</div>
	);
};
