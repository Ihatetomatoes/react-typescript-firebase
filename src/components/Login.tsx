import * as React from 'react';
import { login, resetPassword } from '../utils/auth'

interface LoginProps {
    email: string;
    pw: string;
}
interface LoginState {
    loginMessage: boolean
}

function setErrorMsg(error) {
  return {
    loginMessage: error
  }
}

export default class Login extends React.Component<LoginProps, LoginState> {
    private email: HTMLInputElement;
    private pw: HTMLInputElement;

    constructor(props:LoginProps){
        super(props);
        this.state = {
            loginMessage: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.resetPassword = this.resetPassword.bind(this);
    }
    handleSubmit = (e) => {
        e.preventDefault()
        login(this.email.value, this.pw.value)
        .catch((error) => {
            this.setState(setErrorMsg('Invalid username/password.'))
        })
    }
    resetPassword = () => {
        resetPassword(this.email.value)
        .then(() => this.setState(setErrorMsg(`Password reset email sent to ${this.email.value}.`)))
        .catch((error) => this.setState(setErrorMsg(`Email address not found.`)))
    }
    render() {
        return (
            <div>
                <h2>Login</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email
                            <input type="text" className="form-control" name="email" ref={(email) => this.email = email} placeholder="Email"/>
                        </label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="pw">Password
                            <input type="password" className="form-control" name="pw" placeholder="Password" ref={(pw) => this.pw = pw} />
                        </label>
                    </div>
                    {
                        this.state.loginMessage &&
                            <div className="alert alert-danger" role="alert">
                                <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                                <span className="sr-only">Error:</span>
                                &nbsp;{this.state.loginMessage} <a href="#" onClick={this.resetPassword} className="alert-link">Forgot Password?</a>
                            </div>
                    }
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        );
    }
}