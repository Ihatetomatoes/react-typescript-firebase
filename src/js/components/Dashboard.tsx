import * as React from 'react';
import {ViewStore} from '../stores';
import {observer} from 'mobx-react';

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

    }
    render() {
        const {viewStore} = this.props;
        const {teams} = viewStore;
        return (
            <div>
                <h2>Dashboard</h2>
                {
                    teams && teams.map((team, index) => {
                        return <p key={index}>{team.name}</p>
                    })
                }
            </div>
        );
    }
}

export default Dashboard;