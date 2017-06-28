import * as React from 'react';
import {
  Route, BrowserRouter, Link, Redirect, Switch
} from 'react-router-dom';
import {observer, Provider} from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import {Home, Login, Register, Account, NavBar, Loader} from '../components'

import {ViewStore} from '../stores'

interface AppProps {

}
interface AppState {
    viewStore: ViewStore
}

@observer
export default class App extends React.Component<AppProps, AppState> {
    constructor(props){
        super(props);

        const viewStore = new ViewStore();

        this.state = {
            viewStore
        }
    }
    componentDidMount () {
        const {viewStore} = this.state;
        viewStore.firebaseCheckAuth();
    }

    render(){
        const {viewStore} = this.state;
        const {authed, user, isLoading} = viewStore;
        return (
            <div className={`${isLoading ? ' is-loading' : ''}`}>
                {
                    <DevTools />
                }
                {
                    isLoading ? <Loader /> : <BrowserRouter>
                        <div>
                            <NavBar handleLogOut={() => viewStore.logOut()} authed={authed} user={user} />
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