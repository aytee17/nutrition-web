import React from "react";

import style from "../style/main.scss";

const ListItem = ({
	className,
	onClick,
	onMouseOver,
	onMouseOut,
	name,
	isActive,
	children
}) => (
	<div
		className={className}
		onClick={onClick}
		onMouseOver={onMouseOver}
		onMouseOut={onMouseOut}
	>
		<div className={style["ingredient-name"]}>{name}</div>
		{isActive && children}
	</div>
);

export default ListItem;
