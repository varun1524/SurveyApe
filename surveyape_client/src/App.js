import React, { Component } from 'react';

import { Route, withRouter, Switch } from 'react-router-dom';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import DemoSignIn from './components/DemoSignIn';
import DemoSignUp from './components/DemoSignUp';

class App extends Component {
    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <Switch>
                        <Route path= "/signup" render = {() => ( <DemoSignUp />)}/>
                        <Route path= "/" render = {() => (<DemoSignIn />)}/>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
