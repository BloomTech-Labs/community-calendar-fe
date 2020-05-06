import React from 'react';
import { Route, Redirect } from "react-router-dom"

//okta
import {useOktaAuth} from '@okta/okta-react'

const ProtectedRoute = ({component:Component, ...rest}) =>{
    
    const {authState, authService} = useOktaAuth()

    return(
        <Route
        {...rest}
        render={props => {
            if (authState.isAuthenticated) {
                return<Component {...props} />
            }else{
                return <Redirect to="/" />
            }
        }}
        />
    )
}

export default ProtectedRoute