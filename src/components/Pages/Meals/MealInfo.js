import React, { Component } from "react";
import style from "./MealInfo.scss";
import Meter from "../../Meter/Meter";
import { Input, SmallLabel } from "../../UI/Inputs";
import { Horizontal } from "../../Templates/Templates";

export default class MealInfo extends Component {
    constructor(props) {
        super(props);

        this.state = this.defaultState = { servings: 1 };
    }

    calculateAmount = total =>
        total / this.props.meal.serves * this.state.servings;

    onServingsChange = event => {
        let value = event.target.value;
        if (value.length == 0) {
            value = "";
        } else if (value < 1) {
            value = 1;
        } else if (value.length > 4) {
            return;
        }
        this.setState({ servings: value });
    };

    onServingsBlur = event => {
        if (this.state.servings === "") {
            this.setState(this.defaultState);
        }
    };

    render() {
        const { user, meal, ingredients, allIngredients } = this.props;
        const { servings } = this.state;
        let moreServes = false;
        let multiplier = 1;
        if (servings > meal.serves) {
            moreServes = true;
            multiplier = servings / meal.serves;
        }

        return (
            <div className={style["meal"]}>
                <div>
                    <Horizontal>
                        <div>
                            <div style={{ fontSize: "1.3rem" }}>
                                {meal.meal_name}
                            </div>
                            <div
                                style={{
                                    fontSize: "0.85rem",
                                    color: "rgb(78, 74, 87)"
                                }}
                            >
                                Serves {meal.serves}
                            </div>
                        </div>
                        <Input
                            type="number"
                            value={this.state.servings}
                            onBlur={this.onServingsBlur}
                            onChange={this.onServingsChange}
                            min={1}
                            max={9999}
                            number
                            noUnits
                        >
                            <SmallLabel>Servings</SmallLabel>
                        </Input>
                    </Horizontal>
                    <br />
                    <Meter
                        title="Energy"
                        units="kJ"
                        total={user.eer}
                        amount={this.calculateAmount(meal.totalEnergy)}
                        color="#45b0e6"
                    />
                    <Meter
                        title="Protein"
                        units="g"
                        total={user.proteinRequirement}
                        amount={this.calculateAmount(meal.totalProtein)}
                        color="#D32F2F"
                    />
                </div>
                <div>
                    <div className={style["ingredient-list"]}>
                        <b>Ingredients</b>
                        <MealIngredients
                            {...{ ingredients, allIngredients, multiplier }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

function MealIngredients({ ingredients, allIngredients, multiplier }) {
    return ingredients
        .sort((a, b) => a.order_no - b.order_no)
        .map(ingredient => {
            let { description } = ingredient;
            description = description ? `, ${ingredient.description}` : "";
            return (
                <div key={ingredient.id} className={style["ingredient"]}>
                    <div className={style["amount"]}>
                        {ingredient.amount * multiplier}
                        {ingredient.units}
                    </div>
                    <div>
                        {allIngredients[ingredient.id].name}
                        {description}
                    </div>
                </div>
            );
        });
}
