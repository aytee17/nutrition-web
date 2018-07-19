import React, { Component } from "react";
import { Select } from "./Inputs";
import { Error } from "../Templates/Templates";
import { range, isLeapYear } from "../../Utility";

class DatePicker extends Component {
	constructor(props) {
		super(props);

		this.state = {
			year: "",
			month: "",
			day: ""
		};

		this.currentYear = this.currentYear();

		this.months = [
			["January", 31],
			["February", 28],
			["March", 31],
			["April", 30],
			["May", 31],
			["June", 30],
			["July", 31],
			["August", 31],
			["September", 30],
			["October", 31],
			["November", 30],
			["December", 31]
		];
	}

	currentYear = () => {
		return new Date().getFullYear();
	};

	handleCange = (event, property) => {
		this.setState({ [property]: event.target.value });
	};

	renderYears() {
		return this.renderItems(
			"year",
			range(1905, this.currentYear + 1 - 13)
		).reverse();
	}

	renderMonths() {
		return this.renderItems("month", this.months.map(t => t[0]), true);
	}

	renderDays() {
		const year = this.props.date.year || this.state.year;
		const month = this.props.date.month || this.state.month;
		let numDays = month == 0 ? 31 : this.months[month - 1][1];

		if (year !== "Year") {
			if (month == 2 && isLeapYear(year)) {
				numDays = numDays + 1;
			}
		}

		return this.renderItems("day", range(1, numDays + 1));
	}

	renderItems(category, items, indexAsValues = false) {
		return items.map((item, index) => {
			let selected = false;
			if (this.state[category] === item) selected = true;
			return (
				<option
					key={index}
					defaultValue={selected}
					value={indexAsValues ? index + 1 : item}
				>
					{item}
				</option>
			);
		});
	}

	render() {
		const { errors, touched } = this.props;

		const dayInvalid =
			errors.date &&
			errors.date.day &&
			(touched.day || (touched.date && touched.date.day));
		const monthInvalid =
			errors.date &&
			errors.date.month &&
			(touched.month || (touched.date && touched.date.day));
		const yearInvalid =
			errors.date &&
			errors.date.year &&
			(touched.year || (touched.date && touched.date.day));

		return (
			<div>
				<div style={{ marginLeft: "0.1rem" }}>{this.props.label}</div>
				<div style={{ marginTop: "0.3rem", display: "flex" }}>
					<Select
						name="day"
						value={this.props.date.day || this.state.day}
						onChange={
							this.props.onChange ||
							(event => this.handleCange(event, "day"))
						}
						onBlur={this.props.onBlur}
						invalid={dayInvalid}
						disabled={this.props.disabled}
					>
						<option value={0} key="day">
							Day
						</option>

						{this.renderDays()}
					</Select>

					<Select
						name="month"
						value={this.props.date.month || this.state.month}
						onChange={
							this.props.onChange ||
							(event => this.handleCange(event, "month"))
						}
						onBlur={this.props.onBlur}
						invalid={monthInvalid}
						disabled={this.props.disabled}
					>
						<option value={0} key="month">
							Month
						</option>

						{this.renderMonths()}
					</Select>

					<Select
						name="year"
						value={this.props.date.year || this.state.year}
						onChange={
							this.props.onChange ||
							(event => this.handleCange(event, "year"))
						}
						onBlur={this.props.onBlur}
						invalid={yearInvalid}
						disabled={this.props.disabled}
					>
						<option value={0} key="year">
							Year
						</option>

						{this.renderYears()}
					</Select>
				</div>
				<Error style={{ marginTop: "0.4rem" }}>
					<div>{dayInvalid && <span>{errors.date.day}</span>}</div>
					<div>
						{monthInvalid && <span>{errors.date.month}</span>}
					</div>
					<div>{yearInvalid && <span>{errors.date.year}</span>}</div>
				</Error>
			</div>
		);
	}
}

export default DatePicker;
