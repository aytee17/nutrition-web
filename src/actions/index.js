import axios from "axios";
import { cacheAdapterEnhancer } from "axios-extensions";
import SecureLS from "secure-ls";
import { EER, proteinRequirement, dietaryFiberRequirement } from "../Utility";

import * as action from "./actions";

import {
	UPDATE_SEARCH_TERM,
	GET_INGREDIENTS,
	HOVER_INGREDIENT,
	UPDATE_AMOUNT,
	SET_READY,
	ADD_INGREDIENT,
	CLEAR_ACTIVE_INGREDIENT,
	CLEAR_INGREDIENTS,
	CLEAR_SEARCH_TERM,
	LOGIN,
	LOGOUT,
	UPDATE_USER,
	GET_MEALS
} from "./actions";

const secureStorage = new SecureLS({ encodingType: "aes" });

const source = axios.CancelToken.source();

axios.defaults.withCredentials = true;
const http = axios.create({
	baseURL: "http://localhost:3000/"
});

export const getMeals = () => {
	const endpoint = "/meals";
	return dispatch =>
		http.get(endpoint).then(response => {
			dispatch({
				type: GET_MEALS,
				payload: { ...response.data, loaded: true }
			});
		});
};

const processUser = user => {
	const age = Math.floor((Date.now() - new Date(user.dob)) / 31536000000);
	const { weight, activity_level, gender } = user;
	if (weight && activity_level) {
		user = {
			...user,
			age,
			eer: EER(gender, age, weight, activity_level),
			proteinRequirement: proteinRequirement(gender, age),
			dietaryFiberRequirement: dietaryFiberRequirement(gender, age)
		};
		return user;
	}
	return user;
};

export const updateUser = user => {
	user = processUser(user);
	secureStorage.set("state", { user });
	return {
		type: UPDATE_USER,
		payload: user
	};
};

export const login = user => {
	user = processUser(user);
	secureStorage.set("state", { user });
	return {
		type: LOGIN,
		payload: user
	};
};

export const logout = () => {
	const endpoint = "/logout";
	return dispatch => {
		return http.get(endpoint).then(response => {
			dispatch({ type: LOGOUT, payload: null });
			secureStorage.remove("state");
		});
	};
};

export const updateSearchTerm = term => ({
	type: UPDATE_SEARCH_TERM,
	payload: term
});

export const hoverIngredient = id => ({
	type: HOVER_INGREDIENT,
	payload: id
});

export const getIngredients = searchTerm => {
	if (searchTerm === "") {
		return {
			type: GET_INGREDIENTS,
			payload: []
		};
	}

	return dispatch => {
		const endpoint = `/ingredients?q=${searchTerm}`;
		return http
			.get(endpoint, {
				cancelToken: source.token
			})
			.then(response => {
				const ingredients = response.data;

				dispatch({
					type: GET_INGREDIENTS,
					payload: ingredients
				});
				dispatch(hoverIngredient(ingredients[0].id));
			});
	};
};

export const updateAmount = amount => ({
	type: UPDATE_AMOUNT,
	payload: amount
});

export const setReady = status => ({
	type: SET_READY,
	payload: status
});

export const addIngredient = id => ({
	type: ADD_INGREDIENT,
	payload: id
});

export const clearActiveIngredient = () => ({
	type: CLEAR_ACTIVE_INGREDIENT,
	payload: null
});

export const clearIngredients = () => ({
	type: CLEAR_INGREDIENTS,
	payload: null
});

export const clearSearchTerm = () => ({
	type: CLEAR_SEARCH_TERM,
	payload: null
});
