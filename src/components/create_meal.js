import React, { Component } from "react";

import IngredientSearchList from "../containers/IngredientSearchList";
//import SmallInput from "./SmallInput";
import MealEditor from "../containers/meal_editor";
import style from "../style/main.scss";
import Header from "./Header";

const CreateMeal = () => (
	<div>
		<Header />
		<div className={style["split"]}>
			<div className={style["chooser"]}>
				<IngredientSearchList />
			</div>
			<MealEditor />
		</div>
	</div>
);

export default CreateMeal;
