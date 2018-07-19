import React, { Component } from "react";
import cs from "classnames";

import ListItem from "./ListItem";
//import SmallInput from "../components/SmallInput";
import { Input } from "./FormELements";

import style from "../style/main.scss";

const List = ({
	activeItem,
	hoverItem,
	clearActiveItem,
	order,
	items,
	children
}) => {
	const renderList = () => {
		return order.map(id => {
			const isActiveItem = id === activeItem.id;

			const readyToSubmit = isActiveItem ? activeItem.ready : false;
			const classes = cs(style["item"], {
				[style["active"]]: isActiveItem,
				[style["ready"]]: readyToSubmit
			});

			const onClick = () => 1 /*selectItem(id);*/

			const onMouseOver = () => hoverItem(id);
			const onMouseOut = () => clearActiveItem();

			return (
				<ListItem
					key={id}
					className={classes}
					onClick={onClick}
					onMouseOver={onMouseOver}
					onMouseOut={onMouseOut}
					isActive={isActiveItem}
					name={items[id].name}
				>
					{children}
				</ListItem>
			);
		});
	};

	return <div className={style["list"]}>{renderList()}</div>;
};

export default List;
