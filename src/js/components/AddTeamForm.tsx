import * as React from 'react';
import {ViewStore} from '../stores';

interface AddTeamFormProps {
    viewStore: ViewStore
}
interface AddTeamFormState {
    teamID: string,
    teamName: string
}

class AddTeamForm extends React.Component<AddTeamFormProps, AddTeamFormState> {
    
    constructor(){
        super();

        this.state = {
            teamID: '',
            teamName: ''
        }
    }

    handleInputChange(e){
        const {name, value} = e.target;
        this.setState({
            [name]: value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const {viewStore} = this.props;
        const {teamID, teamName} = this.state;
        if (teamID && teamName && (teamID.trim().length !== 0 || teamName.trim().length !== 0)) {
            //console.log(teamID, teamName);
            viewStore.addTeam(teamID,teamName);
            this.setState({
                teamID: '',
                teamName: ''
            });
        }
    }

    render() {
        return (
            <div>
                <h2>Add New Team</h2>
                <form className="form-inline" onSubmit={(e) => {
                    this.handleSubmit(e);
                }}>
                    <div className="form-group">
                        <label htmlFor="teamID">Team ID</label>
                        <input type="text" className="form-control" id="teamID" name="teamID" placeholder="manchesterUnited" 
                        value={this.state.teamID}
                        onChange={(e) =>{
                            this.handleInputChange(e);
                        }} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="teamName">Name</label>
                        <input type="text" className="form-control"  name="teamName" placeholder="Manchester United"
                        value={this.state.teamName}
                        onChange={(e) =>{
                            this.handleInputChange(e);
                        }} />
                    </div>
                    <button type="submit" className="btn btn-primary">Add team</button>
                </form>
            </div>
        );
    }
}

export default AddTeamForm;