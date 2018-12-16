import React, { Component } from "react";
import AppLayout from "../../Templates/AppLayout";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import MealInfo from "./MealInfo";
import { Pane } from "../../Templates/Templates";
import AddMeal from "./AddMeal";
import { getMeals } from "../../../redux/actions/ActionCreators";

class Meals extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (!this.props.loaded) {
            this.props.getMeals();
        }
    }

    renderMeals() {
        if (this.props.meals) {
            const { user, meals, allIngredients } = this.props;
            return Object.values(meals).map(meal => {
                const { ingredients } = meal;
                return (
                    <Pane style={{ width: "18rem" }}>
                        <MealInfo
                            key={meal.meal_id}
                            {...{ user, meal, ingredients, allIngredients }}
                        />
                    </Pane>
                );
            });
        }
    }

    render() {
        return (
            <AppLayout>
                <div
                    style={{
                        display: "grid",
                        gridTemplateRows: "4.8rem auto"
                    }}
                >
                    <div
                        style={{
                            fontSize: "2.375em",
                            fontWeight: "bold",
                            letterSpacing: "-0.005em",
                            alignItems: "center",
                            display: "flex",
                            margin: "2rem 0 0 3rem"
                        }}
                    >
                        Meals
                    </div>
                    <div
                        style={{
                            margin: "1rem 0 0 3rem"
                        }}
                    >
                        <AddMeal user={this.props.user} />
                        {this.renderMeals()}
                    </div>
                </div>
            </AppLayout>
        );
    }
}

const mapStateToProps = state => {
    const { meals, allIngredients, loaded } = state.meals;
    return {
        meals,
        allIngredients,
        loaded,
        user: state.user
    };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({ getMeals }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Meals);
