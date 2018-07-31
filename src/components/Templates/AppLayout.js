import React from "react";
import style from "./AppLayout.scss";
import cs from "classnames";
import Header from "./Header";
import { SideBar, SideBarItem } from "./Templates";
import { FoodIcon, PlanIcon, DashboardIcon, IngredientIcon } from "../Icons/Icons";

export default function AppLayout ({ noBar, children }) {
	const classNames = cs({
		[style["template"]]: !noBar,
		[style["template-no-bar"]]: noBar
	});

	return (
		<div id={style["template-all"]}>
			<Header />
			<div id={classNames}>
				{!noBar && (
					<SideBar>
						<SideBarItem to="/">
							<DashboardIcon />
							<div style={{ marginLeft: "0.4rem" }}>
								Dashboard
							</div>
						</SideBarItem>

						<SideBarItem to="/">
							<PlanIcon />

							<div style={{ marginLeft: "0.4rem" }}>Plans</div>
						</SideBarItem>

						<SideBarItem to="/meals">
							<FoodIcon />
							<div style={{ marginLeft: "0.4rem" }}>Meals</div>
						</SideBarItem>
						<SideBarItem to="/">
							<IngredientIcon />
							<div style={{ marginLeft: "0.4rem" }}>Ingredients</div>
						</SideBarItem>

					</SideBar>
				)}
				{children}
			</div>
		</div>
	);
};
