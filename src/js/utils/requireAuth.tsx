import * as React from 'react';
import {ViewStore} from '../stores';
import {observer, inject} from 'mobx-react';
import {UnAuthorised} from '../components'

const requireAuth = (Component) => {
    
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

export default requireAuth;