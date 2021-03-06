import React, { Component } from "react";
import style from "./AddMeal.scss";
import cs from "classnames";
import api from "../../../utils/api";
import keys from "../../../utils/keys";
import { Button, Input } from "../../Controls/Inputs";
import { AddIcon, CloseIcon, ClearIcon, TickIcon } from "../../Icons/Icons";
import { Pane, Horizontal } from "../../Templates/Templates";
import {
    EnergyMeter,
    ProteinMeter,
    DietaryFibreMeter
} from "../../Meter/NutritionMeters";
import SearchList from "../../SearchList/SearchList";
import Loadable from "react-loadable";

const DraggableList = Loadable({
    loader: () => import("../../DraggableList/DraggableList"),
    loading: () => <div />
});

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
        api.get(endpoint).then(response => responseHandler(response.data));
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

    removeIngredient = id => {
        const ingredients = this.state.ingredients;
        delete ingredients[id];

        const order = this.state.order;
        const index = order.indexOf(id);
        order.splice(index, 1);

        this.setState({ ingredients, order }, this.calculateNutrientTotals);
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
            this.calculateNutrientTotals
        );
    };

    calculateNutrientTotals = () =>
        this.setState({
            totalProtein: this.accumulate("protein"),
            totalEnergy: this.accumulate("energy"),
            totalDietaryFiber: this.accumulate("dietary_fiber")
        });

    accumulate = attribute => {
        if (this.state.order.length === 0) return 0;
        return this.state.order
            .map(id => {
                const ingredient = this.state.ingredients[id];
                const { amount, units } = ingredient;
                const modifier = units === "amount" ? amount : amount / 100;
                return ingredient[attribute] * modifier;
            })
            .reduce((total, current) => total + current);
    };

    checkReadySubmit = () => {
        const titleReady = this.state.title.length > 0;
        const servesReady = this.state.serves >= 1;
        const hasIngredients = this.state.order.length > 0;

        let ingredientsHaveAmounts = hasIngredients ? true : false;
        for (let id of this.state.order) {
            const ingredient = this.state.ingredients[id];
            if (isNaN(ingredient.amount) || ingredient.amount <= 0) {
                ingredientsHaveAmounts = false;
                break;
            }
        }
        return (
            titleReady &&
            servesReady &&
            hasIngredients &&
            ingredientsHaveAmounts
        );
    };

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
        const readySubmit = this.checkReadySubmit();
        console.log({ readySubmit });
        return (
            <Horizontal style={{ justifyContent: "flex-start" }}>
                <div>
                    <Button
                        pressed={active}
                        disabled={active}
                        greyed={active}
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
                            <div className={style["submit"]}>
                                <Button
                                    disabled={!readySubmit}
                                    greyed={!readySubmit}
                                >
                                    <TickIcon />
                                </Button>
                            </div>

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
                                <EnergyMeter
                                    total={user.eer}
                                    amount={totalEnergy}
                                />
                                <ProteinMeter
                                    total={user.proteinRequirement}
                                    amount={totalProtein}
                                />
                                <DietaryFibreMeter
                                    total={user.dietaryFiberRequirement}
                                    amount={totalDietaryFiber}
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
                                            updateAmount: this.updateAmount,
                                            removeIngredient: this
                                                .removeIngredient
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
    updateAmount,
    removeIngredient
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
            <span>{ingredient.name}</span>
            <ClearIcon
                className={style["remove-ingredient"]}
                onClick={event => removeIngredient(ingredient.id)}
            />
        </div>
    );
};
