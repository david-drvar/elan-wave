import { userConstants } from "../constants";

const initialState = {
    user: {},
    jwt: "",
    id: "",
    username: ""
}

export const user = (state = initialState, action) => {
    switch(action.type) {
        case userConstants.REGISTER_REQUEST:
            return {
                ...state,
                jwt: action.data.jwt,
                id: action.data.id
            }
        case userConstants.LOGIN_REQUEST:
            return {
                ...state,
                jwt: action.data.jwt,
                id: action.data.id,
                username: action.data.username
        }
        case userConstants.LOGOUT_REQUEST:
            return {
                ...initialState
            };
        default: 
            return state;
    }
}