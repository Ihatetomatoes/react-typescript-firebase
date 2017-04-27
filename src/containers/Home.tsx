import * as React from 'react';
import { firebaseAuth } from '../utils/firebase';
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'

//TODO: https://github.com/tylermcginnis/react-router-firebase-auth

interface HomeProps {

}
interface HomeState {
    authed: boolean,
    loading: boolean,
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
        : <Redirect to='/Home' />}
    />
  )
}

class Home extends React.Component<HomeProps, HomeState> {
    constructor(props){
        super(props);
        this.state = {
            authed: false,
            loading: true
        }
        this.authenticate = this.authenticate.bind(this);
        this.renderLogin = this.renderLogin.bind(this);
        this.authenticate = this.authenticate.bind(this);
    }
     componentDidMount () {
        this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
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
    componentWillUnmount () {
        this.removeListener()
    }
    renderLogin(){
        return (
            <button onClick={() => this.authenticate('twitter')}>Login with Twitter</button>
        )
    }
    renderLogout(){
        return (
            <button>Logout</button>
        )
    }
    authenticate(provider){
        base.AuthWithOAuthPopup(provider, this.authHandler);
    }
    authHandler(err, authData){
        console.log(authData);
    }
    render() {
        
        if(!this.state.uid){
            return <div>{this.renderLogin()}</div>
        }

        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/' exact component={Home} />
                    <PublicRoute authed={this.state.authed} path='/login' component={Login} />
                    <PublicRoute authed={this.state.authed} path='/register' component={Register} />
                    <PrivateRoute authed={this.state.authed} path='/dashboard' component={Dashboard} />
                    <Route render={() => <h3>No Match</h3>} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Home;