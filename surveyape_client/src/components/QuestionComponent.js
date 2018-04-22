import React, {Component} from 'react';
import {connect} from 'react-redux';

import '../stylesheets/QuestionComponent.css';

class QuestionComponent extends Component {

    constructor() {
        super();
        this.state = {

        }
    }

    render() {

        return(
            <div className="QuestionComponent">
                <div className="component_div">
                    <h3>{this.props.question_type}</h3>
                </div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log(state);
    return {
        state: state
    };
}

export default connect(mapStateToProps)(QuestionComponent);