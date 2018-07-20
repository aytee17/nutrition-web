import React, { Component, Children } from "react";
import style from "./Templates.scss";
import cs from "classnames";
import { Link } from "react-router-dom";
import { DownIcon } from "../Icons/Icons";

const BackgroundScroll = ({ children }) => (
	<div id={style["container"]}>
		<div id={style["background"]}>
			<div id={style["background-scroll"]} />
			{children}
		</div>
	</div>
);

export const WelcomeHeading = ({ children, ...props }) => (
	<div id={style["welcome-heading"]} {...props}>
		{children}
	</div>
);

export const Logo = ({ ...props }) => (
	<span className={style["logo"]} {...props}>
		NutritionTrackr
	</span>
);

export const Pane = ({ children, center, fade, ...props }) => {
	const classNames = cs(style["pane"], {
		[style["center"]]: center,
		[style["fade"]]: fade
	});

	return (
		<div className={classNames} {...props}>
			{children}
		</div>
	);
};

export const Direction = ({ children, ...props }) => (
	<div className={style["direction"]} {...props}>
		{children}
	</div>
);

export const Error = ({ children, ...props }) => (
	<div className={style["error"]} {...props}>
		{children}
	</div>
);

export const Horizontal = ({ children, invalid, border, ...props }) => {
	const classNames = cs(style["horizontal"], {
		[style["invalid"]]: invalid,
		[style["border"]]: border
	});

	return (
		<div className={classNames} {...props}>
			{children}
		</div>
	);
};

export const LoadingSpinner = () => {
	return (
		<svg width="1.125em" height="1.125em">
			<linearGradient id="arc-gradient">
				<stop offset="0%" stopOpacity="0" />
				<stop offset="49.99%" stopOpacity="0" />
				<stop offset="50%" stopColor="white" />
				<stop offset="100%" stopColor="white" />
			</linearGradient>
			<circle
				className={style["loading-circle"]}
				r={"0.5em"}
				cy={"0.5625em"}
				cx={"0.5625em"}
				fill="transparent"
				strokeWidth={"0.13em"}
				stroke="url(#arc-gradient)"
			/>
		</svg>
	);
};

export class MenuButton extends Component {
	constructor(props) {
		super(props);
		this.menuButton = React.createRef();
		this.state = {
			open: false
		};
	}

	componentDidMount() {
		document.addEventListener("mousedown", this.handleClickOutside);
	}

	componentWillUnmount() {
		document.removeEventListener("mousedown", this.handleClickOutside);
	}

	handleClickOutside = event => {
		const clickedNode = event.target;
		if (!this.menuButton.current.contains(clickedNode)) {
			this.close();
		}
	};

	toggle = () => {
		this.setState({ open: !this.state.open });
	};

	close = () => {
		this.setState({ open: false });
	};

	render() {
		const classNames = cs(style["menu-button"], {
			[style["on"]]: this.state.open
		});

		const children = Children.toArray(this.props.children);
		const MenuIcon = children.shift();
		return (
			<div
				ref={this.menuButton}
				style={{ position: "relative", marginRight: "2rem" }}
			>
				<button className={classNames} onClick={this.toggle}>
					{MenuIcon}
					<DownIcon open={this.state.open} />
				</button>
				<Menu open={this.state.open}>{children}</Menu>
			</div>
		);
	}
}

export const Menu = ({ open, children, ...props }) => {
	const classNames = cs(style["menu"], {
		[style["open"]]: open
	});

	return (
		<div className={classNames} {...props}>
			{children}
		</div>
	);
};

export const MenuItem = ({ top, children, ...props }) => {
	const classNames = cs(style["menu-item"], {
		[style["top"]]: top
	});

	return (
		<div className={classNames} {...props}>
			{children}
		</div>
	);
};

export const SideBar = ({ children }) => (
	<div className={style["sidebar"]}>{children}</div>
);

export const SideBarItem = ({ children, to }) => (
	<Link to={to}>
		<div className={style["sidebar-item"]}>
			<div className={style["sidebar-contents"]}>{children}</div>
		</div>
	</Link>
);
