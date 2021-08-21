import axios from "axios"
import React from 'react';
import { Row, Col, Card, ListGroup } from 'react-bootstrap';

const tips = [
    {
        condition: "Rain",
        lowPrioThreshold: 0.1,
        lowPrio: 0.3,
        midPrio: 0.6,
        highPrio: 0.9,
        
    }
]


export default class WeatherTips extends React.Component {
    constructor(props) {
        super(props);

        console.log(props.summary);        
    }

    render() {
        return(
            <div>

                meatball
            </div>

        );
    }
}
