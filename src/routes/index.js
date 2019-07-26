import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import PrivateRoutes from './PrivateRoutes'
import PublicRoutes from './PublicRoutes'
import { hot } from 'react-hot-loader'
import Home from '../views/Home/index'
import Auth from '../views/Auth/index'

const Routes = () => (
  <Switch>
    <PublicRoutes
      path="/"
      component={Auth}
      exact={true}
    />
    <PublicRoutes
      path="/auth"
      component={Auth}
      exact={true}
    />
    <PrivateRoutes
      path="/home"
      component={Home}
      exact={true}
    />
    <Redirect to="/" />
  </Switch>
)

export default hot(module)(Routes)
