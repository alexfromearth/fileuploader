import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import Main from "../Main";
import GuestScreen from "./GuestScreen";
import {CircularProgress} from "@material-ui/core";
import {Route} from "react-router-dom";
import Login from "../LoginPage";
import RegistrationPage from "../RegPage";
import {authentication} from "../../redux/ActionThunkSagaCreators/sagaActionCreators";

function StartScreen() {
    const isAuth = useSelector((state) => state.main.isAuth);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(authentication())
    }, [])

    return (
        <>
            <Route path="/login">
                <Login/>
            </Route>
            <Route path="/registration">
                <RegistrationPage/>
            </Route>
            <Route path="/">
                {isAuth
                    ? <Main/>
                    : <GuestScreen/>}
            </Route>
        </>
    )
}

export default StartScreen;

