import {observable} from 'mobx';
import { firebaseAuth } from '../utils/firebase';
import { logout } from '../utils/auth';
import createBrowserHistory from 'history/createBrowserHistory';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';

export default class ViewStore {
    @observable authed: boolean = false;
    @observable isLoading: boolean = true;
    @observable user: any = null;
    @observable redirectToDashboard: boolean = false;
    @observable routerStore: RouterStore;
    @observable history: any;
    
    constructor(){

        const browserHistory = createBrowserHistory();
        this.routerStore = new RouterStore();
        this.history = syncHistoryWithStore(browserHistory, this.routerStore);

    }

    firebaseCheckAuth(){
        firebaseAuth().onAuthStateChanged((user) => {
            if (user) {
                this.authed = true,
                this.isLoading = false,
                this.user = user;
                this.redirectToDashboard = true;
                setTimeout(()=>{
                    this.redirectToDashboard = false;
                },100)
            } else {
                this.authed = false,
                this.isLoading = false,
                this.user = null;
                this.redirectToDashboard = false;
            }
        })
    }

    logOut(){
        logout();
    }
}