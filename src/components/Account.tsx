import * as React from 'react';
import { updateUser, updateEmail } from '../utils/auth';

interface AccountProps {
    user?: any
}
interface AccountState {
    email: string,
    pw: string,
    displayName: string,
    photoURL: string
}

class Account extends React.Component<AccountProps, AccountState> {

    private email: HTMLInputElement;
    private pw: HTMLInputElement;
    private displayName: HTMLInputElement;
    private photoURL: HTMLInputElement;

    constructor(props){
        super(props);
        this.state = {
            email: '',
            pw: '',
            displayName: '',
            photoURL: ''
        }
        this.handleUpdateUser = this.handleUpdateUser.bind(this);
    }

    componentDidMount(){
        const {user} = this.props;
        this.setState({
            email: this.props.user.email,
            pw: this.props.user.password,
            displayName: this.props.user.displayName,
            photoURL: this.props.user.photoURL
        })
    }

    handleUpdateUser(e){
        e.preventDefault()
        updateUser(this.displayName.value, this.photoURL.value);
        updateEmail(this.email.value);
    }

    handleInputUpdate = (e) => {
        const {value, name} = e.target;

        this.setState({
            [name]: value
        })
    }

    render() {

        const {displayName, email, photoURL} = this.state;

        return (
            <div>
                <h2>Account</h2>
                <form onSubmit={this.handleUpdateUser}>
                    <div className="form-group">
                        <label htmlFor="displayName">Display Name
                            <input type="text" value={displayName || ''} className="form-control" name="displayName" ref={(displayName) => this.displayName = displayName} placeholder="Display Name" onChange={(e) => {
                                this.handleInputUpdate(e)
                            }}/>
                        </label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="photoURL">Photo URL
                            <input type="text" value={photoURL || ''} className="form-control" name="photoURL" ref={(photoURL) => this.photoURL = photoURL} placeholder="Photo" onChange={(e) => {
                                this.handleInputUpdate(e)
                            }}/>
                        </label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email
                            <input type="text" value={email || ''} className="form-control" name="email" ref={(email) => this.email = email} placeholder="Email" onChange={(e) => {
                                this.handleInputUpdate(e)
                            }}/>
                        </label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="pw">Password
                            <input type="password" className="form-control" name="pw" placeholder="Password" ref={(pw) => this.pw = pw} disabled/>
                        </label>
                    </div>
                    <p><button type="submit" className="btn btn-primary">Save</button></p>
                </form>
            </div>
        );
    }
}

export default Account;