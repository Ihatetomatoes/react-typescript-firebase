import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Home from './Home'

interface AppProps {
}

const App = (props:AppProps) => {
    return (
        <Router>
            <div>
                <Route exact path="/" render={(props) => (<h1>React + Firebase Authentification</h1>)} />
                <Route path="/" render={(props) => <Home /> } />
            </div>
        </Router>
    )
}

export default App;