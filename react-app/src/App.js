import React from 'react';
import Header from './templates/Header';
import Content from './templates/Content';
import axios from 'axios';
import Context from './Context';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            is_admin: 0,
            tasks_per_page: 0
        }
    }

    componentDidMount() {
        axios.get('/?controller=Common_api&action=getInitInfo')
            .then((data) => {
                let result = data.data;
                this.setState({
                    is_admin: result.is_admin,
                    tasks_per_page: result.tasks_per_page
                })
            })
    }

    render() {
        return (
            <>
                <Context.Provider value={this.state}>
                    <Header/>
                    <Content/>
                </Context.Provider>
            </>
        )
    }
}

export default App;
