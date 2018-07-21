import React, { Component } from "react";
import cs from "classnames";

//import SmallInput from "../components/SmallInput";
import { Input } from "./FormELements";

import style from "../style/main.scss";

const List = ({
	activeItem,
	setActiveItem,
	clearActiveItem,
	order,
	items,
	addActiveItem
}) => {
	const renderList = () => {
		return order.map(id => {
			const isActiveItem = id === activeItem;

			const readyToSubmit = isActiveItem ? activeItem.ready : false;
			const classes = cs(style["item"], {
				[style["active"]]: isActiveItem,
				[style["ready"]]: readyToSubmit
			});

			const onClick = () => 1 /*selectItem(id);*/

			const onMouseOver = () => setActiveItem(id);
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
				/>
			);
		});
	};

	return <div className={style["list"]}>{renderList()}</div>;
};

const ListItem = ({
	className,
	onClick,
	onMouseOver,
	onMouseOut,
	name,
	isActive
}) => (
	<div
		className={className}
		onClick={onClick}
		onMouseOver={onMouseOver}
		onMouseOut={onMouseOut}
	>
		<div className={style["ingredient-name"]}>{name}</div>
		{isActive && "active"}
	</div>
);

export default List;