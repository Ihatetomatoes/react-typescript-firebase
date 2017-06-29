import * as React from 'react';
import {ViewStore} from '../stores';
import {observer} from 'mobx-react';
import {AddTeamForm} from '../components'

interface DashboardProps {
    viewStore: ViewStore
}
interface DashboardState {
}

@observer
class Dashboard extends React.Component<DashboardProps, DashboardState> {
    
    componentDidMount(){
        const {viewStore} = this.props;
        viewStore.firebaseSync();
    }
    componentWillUnmount(){
        const {viewStore} = this.props;
        viewStore.firebaseDisconnect();
    }

    handleRemoveTeam(key){
        const {viewStore} = this.props;
        viewStore.removeTeam(key);
    }
    render() {
        const {viewStore} = this.props;
        const {teams} = viewStore;
        return (
            <div>
                <h2>My Teams</h2>
                {
                    teams.length > 0 ? teams.map((team, index) => {
                        return <p key={index}>{team.name} <button onClick={(e) => { this.handleRemoveTeam(team.key) }}>Remove</button></p>
                    }) : <p>There are no teams. Add some below.</p>
                }
                <AddTeamForm viewStore={viewStore} />
            </div>
        );
    }
}

export default Dashboard;