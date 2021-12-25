import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {useSelector} from "react-redux";

const ProtectedRoute = ({ component: Component, role, ...rest }) => {
    const store = useSelector(state => state);

    return (
        <Route {...rest} render={
            props => {
                if (store.user.jwt) {
                    return <Component {...rest} {...props} />
                }
                else {
                    return <Redirect to={
                        {
                            pathname: '/',
                            state: {
                                from: props.location
                            }
                        }
                    } />
                }
            }
        } />
    )
}

export default ProtectedRoute;