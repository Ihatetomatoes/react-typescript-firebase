import * as React from 'react';
import {
  Route, BrowserRouter, Link, Redirect, Switch
} from 'react-router-dom';
import {withRouter} from 'react-router';
import {observer, Provider, inject} from 'mobx-react';
import { RouterStore } from 'mobx-react-router';
import DevTools from 'mobx-react-devtools';
import {Home, Login, Register, Account, NavBar, Loader, Dashboard, UnAuthorised} from '../components'

import {ViewStore} from '../stores'

interface AppProps {
    viewStore: ViewStore
}
interface AppState {
    viewStore: ViewStore
}


function requireAuth(Component) {
    
    interface ComponentProps {
        viewStore: ViewStore
    }
    interface ComponentState {
        viewStore: ViewStore
    }

    @inject('viewStore')@observer
    class AuthenticatedComponent extends React.Component<ComponentProps, ComponentState> {

        // componentWillMount() {
        //     this.checkAuth();
        // }

        // checkAuth() {
        //     if ( this.props.viewStore && !this.props.viewStore.authed) {
        //         this.props.viewStore.routerStore.history.push(`/login`);
        //     }
        // }

        render() {
            return this.props.viewStore && this.props.viewStore.authed
            ? <Component { ...this.props } />
            : <UnAuthorised />;
        }

    }

    return AuthenticatedComponent;
}

@observer
export default class App extends React.Component<AppProps, AppState> {
    constructor(props){
        super(props);

        this.state = {
            viewStore: this.props.viewStore
        }
    }
    componentDidMount () {
        const {viewStore} = this.props;
        viewStore.firebaseCheckAuth();
    }

    render(){
        const {viewStore} = this.props;
        const {authed, user, isLoading} = viewStore;
        const {routerStore, history} = viewStore;
        return (
            <div className={`${isLoading ? ' is-loading' : ''}`}>
                {
                    <DevTools />
                }
                {
                    isLoading ? <Loader /> : <BrowserRouter history={history} routerStore={routerStore}>
                        <div>
                            <NavBar viewStore={viewStore} />
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="container">
                                        <div className="col-sm-12 col-md-8" >
                                            <Switch>
                                                <Route path='/' exact component={Home} />
                                                <Route path='/login'
                                                    render={routeProps => <Login 
                                                        {...routeProps} 
                                                        viewStore={viewStore}
                                                    />}
                                                />
                                                <Route path='/register' component={Register} />
                                                <Route path='/dashboard' component={requireAuth(Dashboard)} />
                                                <Route path='/account' component={requireAuth(Account)} />
                                                {
                                                    // React Router and passing props to components
                                                    //https://github.com/ReactTraining/react-router/issues/4105#issuecomment-289195202
                                                }
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