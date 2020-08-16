import {
    auth,
    EditFile,
    setAuthUserData,
    setError,
    setGuest,
    setIsFetching
} from '../ActionThunkSagaCreators/sagaActionCreators';
import {all, call, put, takeEvery, takeLatest} from "redux-saga/effects";
import actionType from "../actionType";
import {fileUploadAuthAPI} from "../../api/api";

const API = new fileUploadAuthAPI();

function* editFileFetch(action) {
    try {
        yield put(setIsFetching(true));
        yield call(API.editFile, action.payload.oldFileName, action.payload.newFileName,
            action.payload.fileId, action.payload.userId);
        yield put(auth());
    } catch(error) {
        yield put(setError(error.message));
    }
}

function* deleteFileFetch(action) {
    try {
        yield put(setIsFetching(true));
        yield call(API.deleteFile, action.payload.fileId, action.payload.fileName,
            action.payload.userId);
        yield put(auth());
    } catch(error) {
        yield put(setError(error.message));
    }
}

function* authenticationSaga(action) {
    try {
        yield put(setIsFetching(true));
        const data = yield call(API.isUserAuthenticated);
        yield put(setIsFetching(false));
        if (data.resultCode === 0) {
            const {_id, userEmail, userName, files} = data;
            yield put(setAuthUserData(_id, userEmail, userName, files, true));
        } else if(data.resultCode === 10) {
            yield put(setGuest());
            window.localStorage.clear();
        }
    } catch {

    }
}

function* authWatcher() {
    yield takeEvery(actionType.AUTH, authenticationSaga);
}

function* editWatcher() {
      yield takeEvery(actionType.EDIT_FILE, editFileFetch);
}

function* deleteWatcher() {
    yield takeEvery(actionType.DELETE_FILE, deleteFileFetch)
}

function* mySaga() {
    yield all([
        authWatcher(),
        editWatcher(),
        deleteWatcher()
    ])
}

export default mySaga;