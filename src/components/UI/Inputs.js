import React, { Component, Children } from "react";
import style from "./Inputs.scss";
import cs from "classnames";
import zxcvbn from "zxcvbn";
import { Horizontal, Menu } from "../Templates/Templates";
import { VisibilityIcon, DownIcon } from "../Icons/Icons";
import { range } from "../../Utility";

export const InputList = ({ children }) => (
	<div className={style["input-list"]}>
		{children}
	</div>
);

export const Input = ({
	children,
	icon,
	invalid,
	errorMessage,
	number,
	noUnits,
	noEmoji,
	...props
}) => {
	const className = cs({
		[style["input-with-icon"]]: icon,
		[style["input"]]: !icon,
		[style["invalid"]]: invalid,
		[style["number"]]: number,
		[style["no-units"]]: number && noUnits,
		[style["no-emoji"]]: noEmoji
	});
	return (
		<div className={style["input-container"]}>
			<input className={className} required {...props} />
			{Children.map(children, child =>
				React.cloneElement(child, { invalid, errorMessage })
			)}
		</div>
	);
};

export const FixedDisplay = ({ title, content }) => (
	<div className={style["fixed-info"]}>
		<div className={style["fixed-label"]}>{title}</div>
		<div className={style["fixed-content"]}>{content}</div>
	</div>
);

export const Label = ({ icon, children, invalid, errorMessage, ...props }) => {
	const className = cs(style["floating-label"], {
		[style["with-icon"]]: icon,
		[style["invalid"]]: invalid
	});
	return (
		<label className={className} {...props}>
			{children} {invalid && errorMessage}
		</label>
	);
};

export const SmallLabel = ({ children, ...props }) => (
	<label className={style["small-label"]} {...props}>
		{children}
	</label>
);

export const Button = ({ children, ...props }) => (
	<button className={style["button"]} {...props}>
		{children}
	</button>
);

export const ButtonTitle = ({ isSubmitting, children }) => {
	return (
		<div className={style["button-title"]}>
			{!isSubmitting ? children : <LoadingSpinner />}
		</div>
	);
};

export const Select = ({ children, invalid, ...props }) => {
	const className = cs(style["select"], {
		[style["invalid"]]: invalid
	});
	return (
		<select className={className} {...props}>
			{children}
		</select>
	);
};

export const Radio = ({ id, label, ...props }) => {
	const className = cs({
		[style["selected-radio"]]: props.checked
	});
	return (
		<div style={{ padding: "0.25rem" }}>
			<input
				style={{ margin: "0.3125rem", marginRight: "0.4rem" }}
				type="radio"
				id={id}
				{...props}
			/>
			<label className={className} htmlFor={id}>
				{label}
			</label>
		</div>
	);
};

export const PasswordStrengthIndicator = ({ value, score, disabled, slide }) => {
	const strengthLevels = [
		"Very Weak ❌",
		"Weak ❌",
		"Medium ✅",
		"Strong ✅",
		"Very Strong 💪✅"
	];
	const classes = ["very-weak", "weak", "okay", "strong", "very-strong"];
	const strength = strengthLevels[score];
	const indicatorClass = classes[score];

	const renderIndicator = () => {
		return range(0, 5).map(bar => {
			const barClasses = cs(style["bar"], {
				[style[indicatorClass]]: bar <= score,
				[style["plain"]]: bar > score
			});
			return <div key={bar} className={barClasses} />;
		});
	};

	const className = cs(style["hidden"], {
		[style["open"]]: value,
		[style["disabled"]]: disabled
	});

	return (
		<div className={className}>
			<Horizontal style={{ width: "100%" }}>
				<Horizontal
					style={{
						width: "60%",
						padding: "4px 5px",
						marginTop: "0.4rem"
					}}
				>
					{renderIndicator()}
				</Horizontal>
				<span
					style={{
						fontSize: ".8rem",
						paddingLeft: "5px",
						marginTop: "0.25rem"
					}}
				>
					{strength}
				</span>
			</Horizontal>
		</div>
	);
};

export const NewPasswordInput = ({
	value,
	disabled,
	visiblePassword,
	setVisiblePassword,
	title,
	...props
}) => {
	const result = zxcvbn(value.substr(0, 70));
	let score = result.score;

	return (
		<div>
			<Input
				style={{ paddingRight: "2.75rem" }}
				type={visiblePassword ? "text" : "password"}
				name="password"
				value={value}
				disabled={disabled}
				{...props}
			>
				<Label>{title || "Password"}</Label>
				<VisibilityIcon
					visiblePassword={visiblePassword}
					setVisiblePassword={setVisiblePassword}
				/>
			</Input>

			<PasswordStrengthIndicator
				value={value}
				score={score}
				disabled={disabled}
			/>
		</div>
	);
};
