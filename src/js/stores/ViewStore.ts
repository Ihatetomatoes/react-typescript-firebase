import {observable} from 'mobx';
import { firebaseAuth } from '../utils/firebase';
import { logout } from '../utils/auth'

export default class ViewStore {
    @observable authed: boolean = false;
    @observable isLoading: boolean = true;
    @observable user: object = null;

    firebaseCheckAuth(){
        firebaseAuth().onAuthStateChanged((user) => {
            if (user) {
                this.authed = true,
                this.isLoading = false,
                this.user = user;
            } else {
                this.authed = false,
                this.isLoading = false,
                this.user = null;
            }
        })
    }

    logOut(){
        logout();
    }
}