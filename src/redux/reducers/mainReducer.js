import {fileUploadAuthAPI} from '../../api/api';
import actionTypes from '../actionType';
const API = new fileUploadAuthAPI();
// action type consts



// const getStateFromLocal = () => {
//     return window.localStorage.getItem('main');
// }
//
// const stateLocal = getStateFromLocal() ? JSON.parse(getStateFromLocal()) : null;

let initialState = {
    id: null,
    userEmail: null,
    userName: null,
    isFetching: false,
    isAuth: false,
    validationMessage: null,
    files: [],
}


let mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_USER_DATA: {
            return {
                ...state,
                ...action.data,
            }
        }
        case actionTypes.SET_GUEST: {
            return {
                ...state,
                id: null,
                userEmail: null,
                userName: null,
                isAuth: false,
            }
        }
        case actionTypes.SET_VALIDATION_ERROR: {
            return {
                ...state,
                validationMessage: action.message,
            }
        }
        case actionTypes.SET_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching,
            }
        }
        default: {
            return state;
        }
    }
}

export default mainReducer;

