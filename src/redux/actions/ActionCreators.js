import SecureLS from "secure-ls";
import {
    EER,
    proteinRequirement,
    dietaryFiberRequirement
} from "../../utils/nutrition";
import api from "../../utils/api";

import { LOGIN, LOGOUT, UPDATE_USER, GET_MEALS } from "./Actions";

const secureStorage = new SecureLS({ encodingType: "aes" });

export const getMeals = () => {
    const endpoint = "/meals";
    return dispatch =>
        api.get(endpoint).then(response => {
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
        return api.get(endpoint).then(response => {
            dispatch({ type: LOGOUT, payload: null });
            secureStorage.remove("state");
        });
    };
};
