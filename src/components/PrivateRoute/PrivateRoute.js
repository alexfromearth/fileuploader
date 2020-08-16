import React, {useEffect} from 'react';
import {Redirect, Route} from "react-router-dom";
import {authentication} from "../../redux/reducers/mainReducer";
import {connect} from 'react-redux';

function PrivateRoute({ children, ...rest }) {
    useEffect(() => {
        rest.authentication()
    },[]);

    return (
        <Route
            {...rest}
            render={({ location }) =>
                    children
            }
        />
    );
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        isFetching: state.auth.isFetching,
    }
}

export default connect(mapStateToProps, {
    authentication
})(PrivateRoute);
