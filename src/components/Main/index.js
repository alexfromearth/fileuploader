import React from 'react';
import Header from "./Header";
import Footer from "./Footer";
import Loader from "./Loader";
import {useSelector} from "react-redux";
import {CircularProgress} from "@material-ui/core";

function Main() {
    // const {isFetching} = useSelector(state => state.main)
    return (
        <div>
            <Header/>
            <Loader/>
            <Footer/>
        </div>
    );
}

export default Main;
