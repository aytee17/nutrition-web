import React, { Component } from "react";
import { Button, InputList, Input, Label, SmallLabel } from "./UI/Inputs";
import { AddIcon } from "./Icons/Icons";
import { Pane, Horizontal } from "./Templates/Templates";
import { keys } from "../Utility";

export default class AddMeal extends Component {
	constructor(props) {
		super(props);
		this.state = this.defaultState = {
			active: false,
			title: { value: "", complete: false },
			serves: { value: 1, complete: false }
		};
	}

	setActive = event => this.setState({ active: true });

	updateValue = event => {
		const attribute = this.state[event.target.name];
		this.setState({ [event.target.name]: { ...attribute, value: event.target.value } });
	}

	completeValue = event => {
		const attribute = this.state[event.target.name];
		if (event.keyCode === keys.ENTER && attribute.value !== "")
			this.setState({ [event.target.name]: { ...attribute, complete: true } });
	};

	updateServes = event => {
		let { value } = event.target;
		if (value.length == 0) {
			value = "";
		} else if (value < 1) {
			value = 1;
		} else if (value.length > 2) {
			return;
		}
		this.setState({ serves: { ...this.state[event.target.name], value } });
	};

	onServingsBlur = event => {
		if (this.state.serves.value === "") {
			this.setState({ serves: this.defaultState.serves });
		} else {
			this.setState({ serves: {...this.state.serves, complete: true } });
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
						<InputList style={{ paddingTop: "0" }}>
							<Input
								name="title"
								value={title.value}
								onChange={this.updateValue}
								onKeyDown={this.completeValue}
								placeholder="Meal Name"
								autoFocus
								noLabel
							/>
							{title.complete && (
								<Input
									name="serves"
									style={{ width: "4rem" }}
									value={serves.value}
									onFocus={event => event.target.select()}
									onChange={this.updateServes}
									onKeyDown={this.completeValue}
									onBlur={this.onServingsBlur}
									type="number"
									min={1}
									max={99}
									autoFocus
									number
									noUnits
								>
									<SmallLabel style={{ left: "-0.6rem" }}>
										Serves
									</SmallLabel>
								</Input>
							)}
							{serves.complete && <div>Hello</div>}
						</InputList>
					</Pane>
				)}
			</Horizontal>
		);
	}
}
