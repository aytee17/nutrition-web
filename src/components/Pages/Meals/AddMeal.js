import React, { Component } from "react";
import style from "./AddMeal.scss";
import cs from "classnames";
import { http, keys } from "../../../Utility";
import { Button, Input } from "../../UI/Inputs";
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
            totalProtein: 0,
            totalDietaryFiber: 0
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
        const { ingredients, order } = this.state;
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
                    totalEnergy: this.accumulate("energy"),
                    totalDietaryFiber: this.accumulate("dietary_fiber")
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
            totalProtein,
            totalDietaryFiber
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
                                position: "relative",
                                width: "310px"
                            }}
                            fade
                        >
                            <CloseIcon
                                className={style["close"]}
                                onClick={this.close}
                            />

                            <Input
                                style={{ textAlign: "center" }}
                                name="title"
                                value={title}
                                onChange={this.updateTitle}
                                onKeyDown={event => {
                                    if (event.keyCode === keys.ENTER) {
                                        this.focusSearchBar();
                                    }
                                }}
                                placeholder="Meal Name"
                                autoFocus
                                noLabel
                            />

                            <div className={style["stats"]}>
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
                                <Meter
                                    title="Dietary Fibre"
                                    units="g"
                                    total={user.dietaryFiberRequirement}
                                    amount={totalDietaryFiber}
                                    color="#9CCC65"
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
                    onClick={event => ingredient.ref.current.select()}
                    onKeyDown={onKeyDown}
                />
                <div>{units}</div>
            </div>
            {ingredient.name}
        </div>
    );
};
