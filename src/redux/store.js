import {applyMiddleware, combineReducers, createStore} from 'redux';
import ThunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import mainReducer from "./reducers/mainReducer";
import createSagaMiddleware from 'redux-saga'
import mySaga from "./sagas/saga";

const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({
    main: mainReducer,
})


const store = createStore(reducers, composeWithDevTools(applyMiddleware(ThunkMiddleware, sagaMiddleware)));

// store.subscribe(() => {
//     const state = store.getState();
//     window.localStorage.setItem('main', JSON.stringify(state.main));
//
// })

sagaMiddleware.run(mySaga)

export default store;
