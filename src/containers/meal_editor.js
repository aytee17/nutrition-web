import React, { Component } from "react";
import { connect } from "react-redux";
import style from "../style/main.scss";

class MealEditor extends Component {
	constructor(props) {
		super(props);
	}

	renderList() {
		return this.props.ingredients.map(ingredient => {
			const {
				id,
				name,
				amount,
				units,
				serving_size,
				energy
			} = ingredient;
			const actualEnergy = (amount / serving_size * energy).toFixed(1);
			return (
				<tr className={style["ingredient-list-item"]} key={id}>
					<td>{name}</td>
					<td className={style["right"]}>{amount + units}</td>
					<td className={style["right"]}>{actualEnergy}</td>
				</tr>
			);
		});
	}

	render() {
		return (
			<div className={style["meal-editor"]}>
				<div className={style["meal-components"]}>
					<table cellPadding="8">
						<thead>
							<tr>
								<th id="heading-ingredient">Ingredient</th>
								<th id="heading-amount">Amount</th>
								<th id="heading-amount">Energy (kJ)</th>
							</tr>
						</thead>
						<tbody>{this.renderList()}</tbody>
						<tfoot>

						</tfoot>
					</table>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		ingredients: state.tempMeal,
	};
}

export default connect(mapStateToProps)(MealEditor);
