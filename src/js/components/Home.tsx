import * as React from 'react';

interface HomeProps {

}
interface HomeState {
}

class Home extends React.Component<HomeProps, HomeState> {
    constructor(props){
        super(props);
    }

    render() {

        return (
            <p>This is a home page.</p>
        );
    }
}

export default Home;