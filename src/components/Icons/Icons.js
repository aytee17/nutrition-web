import React from "react";
import style from "./Icons.scss";
import cs from "classnames";

export const CloseIcon = ({ style }) => (
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={style}>
	    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
	    <path d="M0 0h24v24H0z" fill="none"/>
	</svg>
);

export const AddIcon = ({ style }) => (
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#fff" style={style}>
	    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
	    <path d="M0 0h24v24H0z" fill="none"/>
	</svg>
);

export const IngredientIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="16px"
		height="16px"
		fill="#333"
		viewBox="0 0 24 24"
		version="1.1"
	>
		<path
			d="M 7 2 C 5.355469 2 4 3.355469 4 5 L 4 19 C 4 20.644531 5.355469 22 7 22 L 17 22 C 18.644531 22 20 20.644531 20 19 L 20 5 C 20 3.355469 18.644531 2 17 2 Z M 7 4 L 17 4 C 17.554688 4 18 4.445313 18 5 L 18 10 L 6 10 L 6 5 C 6 4.445313 6.445313 4 7 4 Z M 8 6 L 8 8 L 10 8 L 10 6 Z M 6 12 L 18 12 L 18 19 C 18 19.554688 17.554688 20 17 20 L 7 20 C 6.445313 20 6 19.554688 6 19 Z M 8 14 L 8 18 L 10 18 L 10 14 Z "
		/>
	</svg>
);

export const DashboardIcon = () => (
	<svg
		style={{ fill: "#333" }}
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
		x="0px"
		y="0px"
		width="16px"
		height="16px"
		viewBox="0 0 24 24"
	>
		<path
			d="M4,13h6c0.55,0,1-0.45,1-1V4c0-0.55-0.45-1-1-1H4C3.45,3,3,3.45,3,4v8C3,12.55,3.45,13,4,13z M4,21h6c0.55,0,1-0.45,1-1v-4
		c0-0.55-0.45-1-1-1H4c-0.55,0-1,0.45-1,1v4C3,20.55,3.45,21,4,21z M14,21h6c0.55,0,1-0.45,1-1v-8c0-0.55-0.45-1-1-1h-6
		c-0.55,0-1,0.45-1,1v8C13,20.55,13.45,21,14,21z M13,4v4c0,0.55,0.45,1,1,1h6c0.55,0,1-0.45,1-1V4c0-0.55-0.45-1-1-1h-6
		C13.45,3,13,3.45,13,4z"
		/>
	</svg>
);

export const PlanIcon = () => (
	<svg
		style={{ fill: "#333" }}
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
		x="0px"
		y="0px"
		width="16px"
		height="16px"
		viewBox="0 0 24 24"
	>
		<g>
			<rect x="7" y="15" width="7" height="2" />
			<rect x="7" y="11" width="10" height="2" />
			<rect x="7" y="7" width="10" height="2" />
			<path
				d="M19,3L19,3h-4.18C14.4,1.84,13.3,1,12,1c-1.3,0-2.4,0.84-2.82,2H5h0C4.86,3,4.73,3.01,4.6,3.04
			C4.21,3.12,3.86,3.32,3.59,3.59c-0.18,0.18-0.33,0.4-0.43,0.64C3.06,4.46,3,4.72,3,5v14c0,0.27,0.06,0.54,0.16,0.78
			c0.1,0.24,0.25,0.45,0.43,0.64c0.27,0.27,0.62,0.47,1.01,0.55C4.73,20.99,4.86,21,5,21h0h14h0c1.1,0,2-0.9,2-2V5
			C21,3.9,20.1,3,19,3z M12,2.75c0.41,0,0.75,0.34,0.75,0.75c0,0.41-0.34,0.75-0.75,0.75c-0.41,0-0.75-0.34-0.75-0.75
			C11.25,3.09,11.59,2.75,12,2.75z M19,19H5V5h14V19z"
			/>
		</g>
	</svg>
);

export const FoodIcon = () => (
	<svg
		style={{ fill: "#333" }}
		x="0px"
		y="0px"
		width="16px"
		xmlns="http://www.w3.org/2000/svg"
		height="16px"
		viewBox="0 0 24 24"
	>
		<g>
			<path
				d="M16,6v6c0,1.1,0.9,2,2,2h1v7c0,0.55,0.45,1,1,1h0c0.55,0,1-0.45,1-1V3.13c0-0.65-0.61-1.13-1.24-0.98
			C17.6,2.68,16,4.51,16,6z"
			/>
			<path
				d="M11,9H9V3c0-0.55-0.45-1-1-1h0C7.45,2,7,2.45,7,3v6H5V3c0-0.55-0.45-1-1-1h0C3.45,2,3,2.45,3,3v6c0,2.21,1.79,4,4,4v8
			c0,0.55,0.45,1,1,1h0c0.55,0,1-0.45,1-1v-8c2.21,0,4-1.79,4-4V3c0-0.55-0.45-1-1-1h0c-0.55,0-1,0.45-1,1V9z"
			/>
		</g>
	</svg>
);

export const AccountIcon = () => (
	<svg
		className={style["button-icon"]}
		xmlns="http://www.w3.org/2000/svg"
		width="32"
		height="32"
		viewBox="0 0 24 24"
	>
		<path d="M3 5v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2zm12 4c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zm-9 8c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6v-1z" />
		<path d="M0 0h24v24H0z" fill="none" />
	</svg>
);

export const DownIcon = ({ open }) => {
	const classNames = cs(style["down-icon"], {
		[style["open"]]: open
	});

	return (
		<svg
			className={classNames}
			style={{
				marginBottom: "0.2rem"
			}}
			xmlns="http://www.w3.org/2000/svg"
			x="0"
			y="0"
			width="24"
			height="24"
			viewBox="0 0 24 24"
		>
			<path d="M7.41,8.59L12,13.17l4.59-4.58L18,10l-6,6l-6-6L7.41,8.59z" />
		</svg>
	);
};

export const MailIcon = () => (
	<svg
		className={style["icon"]}
		fill="#000000"
		height="24"
		viewBox="0 0 24 24"
		width="24"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
		<path d="M0 0h24v24H0z" fill="none" />
	</svg>
);

export const LockIcon = () => (
	<svg
		className={style["icon"]}
		fill="#000000"
		height="24"
		viewBox="0 0 24 24"
		width="24"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path d="M0 0h24v24H0z" fill="none" />
		<path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
	</svg>
);

export const TickIcon = () => {
	return (
		<div>
			<svg
				style={{ fill: "#54a82d" }}
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
			>
				<path d="M0 0h24v24H0z" fill="none" />
				<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
			</svg>
		</div>
	);
};

export const VisibilityIcon = ({ visiblePassword, setVisiblePassword }) => {
	return visiblePassword ? (
		<svg
			className={style["icon-right"]}
			onClick={() => setVisiblePassword(false)}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
		>
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
		</svg>
	) : (
		<svg
			className={style["icon-right"]}
			onClick={() => setVisiblePassword(true)}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
		>
			<path
				d="M0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0z"
				fill="none"
			/>
			<path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
		</svg>
	);
};
