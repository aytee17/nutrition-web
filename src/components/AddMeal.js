import React, { Component } from "react";
import style from "./AddMeal.scss";
import { Button, InputList, Input, Label, SmallLabel } from "./UI/Inputs";
import { AddIcon } from "./Icons/Icons";
import { Pane, Horizontal } from "./Templates/Templates";

export default class AddMeal extends Component {
	constructor(props) {
		super(props);
		this.state = this.defaultState = {
			active: false,
			title: "",
			serves: 1
		};
	}

	setActive = event => this.setState({ active: true });

	updateValue = event => this.setState({ [event.target.name]: event.target.value });

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

	render() {
		const { active, title, serves } = this.state;
		return (
			<Horizontal style={{ justifyContent: "flex-start" }}>
				<div>
					<Button
						pressed={active}
						disabled={active}
						onClick={this.setActive}
					>
						<AddIcon />
					</Button>
				</div>
				{active && (
					<Pane
						style={{ padding: "0.5rem", marginLeft: "1rem" }}
						fade
					>
						<div className={style["top"]}>
							<Input
								name="title"
								value={title}
								onChange={this.updateValue}
								onKeyDown={this.completeValue}
								autoFocus
							>
								<Label>Meal Name</Label>
							</Input>
							<Input
								name="serves"
								style={{ width: "4rem", paddingTop: "19px" }}
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
					</Pane>
				)}
			</Horizontal>
		);
	}
}
