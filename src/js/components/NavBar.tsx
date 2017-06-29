import * as React from 'react';
import {
   Link
} from 'react-router-dom';
import {ViewStore} from '../stores'
import {observer, inject} from 'mobx-react';

interface NavBarProps {
    viewStore: ViewStore;
}

const NavBar = observer((props:NavBarProps) => {
    const {authed, user, logOut} = props.viewStore;
    return (
        <nav className="navbar navbar-inverse navbar-static-top">
            <div className="container">
                
                <div className="navbar-header">
                    <Link className="navbar-brand" to="/">Brand</Link>
                </div>
                <ul className="nav navbar-nav navbar-left">
                    {
                        authed && <li><Link to="/dashboard">Dashboard</Link></li>
                    }
                </ul>
                <ul className="nav navbar-nav navbar-right">
                    {
                        !authed && <li><Link to="/login">Sign in</Link></li>
                    }
                    
                    {
                        authed && <li><Link to="/" onClick={(e) => { logOut() }}>Logout</Link></li>
                    }
                </ul>
                {
                    user && <p className="navbar-text navbar-right user-info">Signed in as <Link to="/account">{user.displayName ? user.displayName : 'a stranger'}</Link></p>
                }
            </div>
        </nav>
    )
})

export default NavBar;