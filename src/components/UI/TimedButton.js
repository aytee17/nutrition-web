import React from "react";
import style from "./Inputs.scss";
import cs from "classnames";
import axios from "axios";
import { LoadingSpinner } from "../Templates/Templates";

class TimedButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.defaultState = {
			timer: null,
			sendDisabled: false,
			timeLeft: null,
			submitting: false
		};
	}

	tick = () => {
		const timeLeft = this.state.timeLeft - 1;
		if (timeLeft == 0) {
			this.reset();
		} else {
			this.setState({ timeLeft });
		}
	};

	reset = () => {
		clearInterval(this.state.timer);
		this.setState(this.defaultState);
	};

	render() {
		const classNames = cs(style["button"], {
			[style["waiting"]]: this.state.timeLeft
		});

		return (
			<button
				className={classNames}
				disabled={this.state.sendDisabled}
				style={{ fontSize: "0.85rem", width: "7rem" }}
				onClick={() => {
					this.setState({ submitting: true, sendDisabled: true });
					this.props.request();
					this.setState({
						timeLeft: this.props.time,
						timer: setInterval(this.tick, 1000),
						submitting: false
					});
				}}
			>
				{this.state.submitting ? (
					<LoadingSpinner />
				) : this.state.sendDisabled ? (
					this.props.disabledTitle + " " + this.state.timeLeft
				) : (
					this.props.title
				)}
			</button>
		);
	}
}

export default TimedButton;
