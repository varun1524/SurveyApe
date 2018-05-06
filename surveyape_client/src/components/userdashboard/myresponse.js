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
                <div className="myresponse-details">
                    <div className="surveyee-dashboard-survey-name">
                        Survey Name : <strong>Survey_1</strong>
                    </div>

                    <div className="surveyee-dashboard-survey-type">
                        Survey Type : <strong>Survey_Type</strong>
                    </div>
                </div>
            </div>
        )
    }

}

export default myresponse;