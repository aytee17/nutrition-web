import React, { Component } from "react";
import style from "./List.scss";
import cs from "classnames";

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
			const classNames = cs(style["item"], {
				[style["active"]]: isActiveItem,
				[style["ready"]]: readyToSubmit
			});

			const onClick = () => addActiveItem();

			const onMouseOver = () => setActiveItem(id);
			
			const onMouseOut = () => clearActiveItem();

			return (
				<ListItem
					key={id}
					className={classNames}
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
		<div className={style["item-name"]}>{name}</div>
	</div>
);

export default List;