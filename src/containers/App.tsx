import * as React from 'react';
import {
  Route, BrowserRouter, Link, Redirect, Switch
} from 'react-router-dom'

import { firebaseAuth } from '../utils/firebase';
import {Home, Login, Register, Dashboard} from '../components'
import { logout } from '../utils/auth'

//TODO: https://github.com/tylermcginnis/react-router-firebase-auth

interface AppProps {
}
interface AppState {
    authed: boolean;
    loading: boolean;
}

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/dashboard' />}
    />
  )
}

export default class App extends React.Component<AppProps, AppState> {
    constructor(props){
        super(props);

        this.state = {
            authed: false,
            loading: true
        }
    }
    componentDidMount () {
        firebaseAuth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    authed: true,
                    loading: false,
                })
            } else {
                this.setState({
                    authed: false,
                    loading: false
                })
            }
        })
    }
    render(){
        return this.state.loading === true ? <h1>Loading</h1> : (
            <BrowserRouter>
                <div>
                    {
                        this.state.authed
                        ? <button
                            style={{border: 'none', background: 'transparent'}}
                            onClick={() => {
                                logout()
                            }}
                            className="navbar-brand">Logout</button>
                        : <span>
                            <Link to="/login" className="navbar-brand">Login</Link>
                            <Link to="/register" className="navbar-brand">Register</Link>
                        </span>
                    }
                
                    <Switch>
                        <Route path='/' exact component={Home} />
                        <PublicRoute authed={this.state.authed} path='/login' component={Login} />
                        <PublicRoute authed={this.state.authed} path='/register' component={Register} />
                        <PrivateRoute authed={this.state.authed} path='/dashboard' component={Dashboard} />
                        <Route render={() => <h3>No Match</h3>} />
                    </Switch>

                </div>
            </BrowserRouter>
        )   
    }
}