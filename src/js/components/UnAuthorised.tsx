import * as React from 'react';
import {
   Link
} from 'react-router-dom';

const UnAuthorised = () => {
    return (
        <div>
            <p>You need to be logged in to access this page.</p>
            <p><Link to="/login" className="btn btn-primary">Login</Link></p>
        </div>
    )
}

export default UnAuthorised;