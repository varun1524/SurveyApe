import React, {Component} from 'react';
import HeaderComponent from './Header';

import '../stylesheets/DemoSignIn.css';

class SignIn extends Component {

    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return (
            <div className="DemoSignIn">
                <HeaderComponent />
                <div className="sign-in-form">
                    <form>
                        <div className="sign-in-container">
                            <input type="text" placeholder="Enter Username" name="username" required />
                            <input type="password" placeholder="Enter Password" name="password" required />

                            <button type="submit">Login</button>

                            <span className="sign-in-password">Don't have an account ? <a href="/signup">Sign Up</a></span>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default SignIn;
