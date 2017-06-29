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

    firebaseDisconnect(){
        ref.off();
    }

    firebaseSync(){
        
        // ref.on('value', function(dataSnapshot) {
            
        //     let teams = [];

        //     dataSnapshot.forEach(function(childSnapshot) {
        //         let team = childSnapshot.val();
        //         team['.key'] = childSnapshot.key;
        //         teams.push(team);
        //     });

        //     this.teams = teams;

        // }.bind(this));

        ref.child('teams').on('value', function(snapshot) {
            let teams = [];
            snapshot.forEach(function(childSnapshot) {
                let team = childSnapshot.val();
                team.key = childSnapshot.key;
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

    @action addTeam(teamID:string,teamName:string){
        const teamsRef = ref.child('teams');
        const newTeamKey = teamsRef.push().key;
        ref.child('teams/'+teamID).set({ "name": teamName });
        this.firebaseSync();
    }

    @action removeTeam(key:string){
        const teamsRef = ref.child('teams');
        teamsRef.child(key).remove();
        this.firebaseSync();
    }
}