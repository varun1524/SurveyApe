import React, {Component} from 'react';

import '../../stylesheets/userdashboard/myresponse.css';

class myresponse extends Component {

    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return (
            <div className="myresponse">
                <h3>{this.props.survey_json.survey.survey_name}</h3>
            </div>
        )
    }

}

export default myresponse;
