import {observable, action} from 'mobx';
import { ref, firebaseAuth } from '../utils/firebase';
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

    @observable teams: any[] = [];
    
    constructor(){

        const browserHistory = createBrowserHistory();
        this.routerStore = new RouterStore();
        this.history = syncHistoryWithStore(browserHistory, this.routerStore);

    }

    firebaseSync(){
        
        ref.on("child_added", function(dataSnapshot) {
            
            let teams = [];

            //this.teams.push(dataSnapshot.val());
            dataSnapshot.forEach(function(childSnapshot) {
                let team = childSnapshot.val();
                team['.key'] = childSnapshot.key;
                teams.push(team);
            });

            this.teams = teams;

        }.bind(this));

    }

    firebaseCheckAuth(){
        firebaseAuth().onAuthStateChanged((user) => {
            if (user) {
                this.authed = true,
                this.isLoading = false,
                this.user = user;
                this.redirectToDashboard = true;
                this.firebaseSync();
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

    @action logOut(){
        logout();
    }
}