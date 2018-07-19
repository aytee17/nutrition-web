import React, { Component } from "react";
import style from "./Slider.scss";
import cs from "classnames";
import { Horizontal } from "../Templates/Templates";
import { range } from "../../Utility";

export class Slider extends Component {
	constructor(props) {
		super(props);
		this.state = { level: 4 };
	}

	onChange = event => this.update(event.target.value);

	update = value => this.setState({ level: value });

	render() {
		const { min, max, width, labels } = this.props;
		const levels = max - min + 1;

		return (
			<div>
				<div style={{ width }}>
					<div
						style={{
							border: "1px solid #e1e1e1",
							borderRadius: "3px",
							padding: "0.8rem",
							marginTop: "0.5rem"	
						}}
					>
						<div
							style={{
								fontSize: "0.85rem",
								marginBottom: "0.1rem"
							}}
						>
							<label htmlFor={this.props.name}>
								{this.props.title}
							</label>
						</div>

						<div
							style={{
								width,
								textAlign: "left",
								fontSize: "1.1rem",
								fontWeight: "bold",
								color: "#2d3643"
							}}
						>
							<span className={""}>{this.props.value}</span>: {labels[this.props.value]}
						</div>
					</div>

					<input
						style={{ width }}
						type="range"
						id="start"
						name={this.props.name}
						min={min}
						max={max}
						step="1"
						onChange={this.props.onChange || this.onChange}
						value={this.props.value}
					/>

					<div
						style={{
							width,
							display: "grid",
							gridTemplateColumns: `repeat(${levels}, 1fr)`,
							textAlign: "left"
						}}
					>
						{range(min, max + 1).map((value, index) => {
							const half = levels / 2;
							const middleIndex =
								levels % 2 ? Math.floor(half) : -1;
							const isMiddle = middleIndex == index;
							const firstHalf =
								index < (middleIndex ? Math.floor(half) : half);
							const singleDigit = value <= 9;
							const factor = Math.ceil(40 / (levels * 2));
							const dist = index => index * factor;

							const classNames = cs(style["level"], {
								[style["active"]]: value === this.props.value
							});
							return (
								<div
									key={index}
									style={{
										display: "flex",
										justifyContent: firstHalf
											? "flex-start"
											: isMiddle
												? "center"
												: "flex-end"
									}}
								>
									<div
										className={classNames}
										name="activity_level"
										onClick={
											this.props.onClick(value) ||
											(() => this.update(value))
										}
										value={value}
										style={{
											[`margin${
												firstHalf ? "Left" : "Right"
											}`]: `${
												firstHalf
													? dist(index)
													: isMiddle
														? 0
														: dist(
																max -
																	min -
																	index
														  )
											}%`
										}}
									>
										{value}
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		);
	}
}

export default Slider;
