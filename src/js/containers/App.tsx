import * as React from 'react';
import {
  Route, BrowserRouter, Link, Redirect, Switch
} from 'react-router-dom'

import { firebaseAuth } from '../utils/firebase';
import {Home, Login, Register, Account, NavBar, Loader} from '../components'
import { logout } from '../utils/auth'

interface AppProps {
}
interface AppState {
    authed: boolean;
    isLoading: boolean;
    user: object;
}

export default class App extends React.Component<AppProps, AppState> {
    constructor(props){
        super(props);

        this.state = {
            authed: false,
            isLoading: true,
            user: null
        }
    }
    componentDidMount () {
        firebaseAuth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    authed: true,
                    isLoading: false,
                    user
                })
            } else {
                this.setState({
                    authed: false,
                    isLoading: false,
                    user: null
                })
            }
        })
    }
    logout(){
        logout();
    }
    render(){
        const {authed, user, isLoading} = this.state;
        return (
            <div className={`${isLoading ? ' is-loading' : ''}`}>
                {
                    isLoading ? <Loader /> : <BrowserRouter>
                        <div>
                            <NavBar handleLogOut={() => this.logout()} authed={authed} user={user} />
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="container">
                                        <div className="col-sm-12 col-md-8" >
                                            <Switch>
                                                <Route path='/' exact component={Home} />
                                                <Route path='/login' component={Login} />
                                                <Route path='/register' component={Register} />
                                                {
                                                    // React Router and passing props to components
                                                    //https://github.com/ReactTraining/react-router/issues/4105#issuecomment-289195202
                                                }
                                                <Route path='/account' render={routeProps => <Account {...routeProps} user={user}/>} />
                                                <Route render={() => <h3>No Match</h3>} />
                                            </Switch>
                                        </div>
                                        <div className="col-sm-12 col-md-4" >
                                            <h2>&nbsp;</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </BrowserRouter>
                }
            </div>
        )   
    }
}