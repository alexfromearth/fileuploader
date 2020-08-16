import actionType from "../actionType";
import actionTypes from "../actionType";
import {fileUploadAuthAPI} from "../../api/api";
const API = new fileUploadAuthAPI();
// action creators
export const setAuthUserData = (id, userEmail, userName, files, isAuth) => ({
    type: actionTypes.SET_USER_DATA,
    data: {id, userEmail, userName, files, isAuth}
});
export const setGuest = () => ({type: actionTypes.SET_GUEST});
export const setError = (message) => ({type: actionTypes.SET_VALIDATION_ERROR, message});
export const setIsFetching = (isFetching) => ({type: actionTypes.SET_IS_FETCHING, isFetching})

// thunk creators
export const authentication = () => {
    return (dispatch) => {
        dispatch(setIsFetching(true));
        return API.isUserAuthenticated().then(data => {
            dispatch(setIsFetching(false));
            if (data.resultCode === 0) {
                const {_id, userEmail, userName, files} = data;
                dispatch(setAuthUserData(_id, userEmail, userName, files, true));
            }
            else if(data.resultCode === 10) {
                dispatch(setGuest());
                window.localStorage.clear();
            }
        })
    }
}

export const registration = (fieldData) => {
    return async (dispatch) => {
        dispatch(setIsFetching(true));
        const data = await API.registration(fieldData);
        dispatch(setIsFetching(false));
        if (data.resultCode === 0) {
            dispatch(authentication());
        }
    }
}

//

export const login = (fieldData) => {
    return async (dispatch) => {
        dispatch(setIsFetching(true));
        let data = await API.login(fieldData);
        dispatch(setIsFetching(false));
        if (data.resultCode === 0) {
            dispatch(authentication());
        }
        if (data.resultCode === 10) {
            dispatch(setError());
        }
    }
}
//
export const logoutUser = () => {
    return async (dispatch) => {
        dispatch(setIsFetching(true));
        let data = await API.logout()
        dispatch(setIsFetching(false));
        if (data.resultCode === 0) {
            dispatch(setGuest());
        }
    }
}

export const uploadFile = (file, userId) => {
    return async (dispatch) => {
        dispatch(setIsFetching(true));
        const data = await API.uploadFile(file, userId);
        dispatch(authentication());
        dispatch(setIsFetching(false));
    }
}

// saga creators
export const EditFile = (oldFileName, newFileName, fileId, userId) =>
    ({type: actionType.EDIT_FILE, payload: {oldFileName,  newFileName, fileId, userId}});

export const DeleteFile = (fileId, fileName, userId) =>
    ({type: actionType.DELETE_FILE, payload: {fileId, fileName, userId}});
export const auth = () => ({type: actionType.AUTH});