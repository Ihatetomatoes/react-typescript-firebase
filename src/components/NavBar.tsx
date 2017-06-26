import * as React from 'react';
import {
   Link
} from 'react-router-dom';

const NavBar = ({authed, handleLogOut, user}) => {
    return (
        <nav className="navbar navbar-inverse navbar-static-top">
            <div className="container-fluid">
                
                <div className="navbar-header">
                    <Link className="navbar-brand" to="/">Brand</Link>
                </div>
                <ul className="nav navbar-nav navbar-right">
                    {
                        !authed && <li><Link to="/login">Sign in</Link></li>
                    }
                    
                    {
                        authed && <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span className="glyphicon glyphicon-user" aria-hidden="true"></span>  <span className="caret"></span></a>
                            <ul className="dropdown-menu">
                                <li><a href="#" onClick={() => {
                                    handleLogOut()
                                }}>Logout</a></li>
                            </ul>
                        </li>
                    }
                </ul>
                {
                    user && <p className="navbar-text navbar-right">Signed in as <Link to="/account">{user.displayName ? user.displayName : 'a stranger'}</Link></p>
                }
            </div>
        </nav>
    )
}

export default NavBar;