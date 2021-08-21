import axios from "axios";
import React from "react";
import { Row, Col, Card, ListGroup } from "react-bootstrap";

const tips = {
    "feels_like_high": {
        compare: function(data) {
            if (data >= this.low && data <= this.mid) {
                return 0;
            } else if (data >= this.mid && data <= this.hi) {
                return 1;
            } else if (data >= this.hi) {
                return 2;
            } else {
                return -1
            }
        },
        low: 20,
        mid: 25,
        hi: 30,

        lowColor: "#bff542",
        midColor: "#ff9b3d",
        hiColor: "#ff4238",

        lowTitle: "Warm weather",
        midTitle: "Hot weather",
        hiTitle: "Very hot weather",

        lowMsg: `It's going to be a warm here, so don't dress too warm yourself.`,
        midMsg: `It's going to get hot here. Consider wearing short-sleeved, light-weight attire to stay cool. Also, remember to stay hydrated.`,
        hiMsg: `It's going to be very hot here. Here are some tips:
                - Wear loose-fitting, short-sleeved clothes for better air circulation 
                - Wear light-coloured fabrics to reflect sunlight
                - Wear natural fibre fabrics such as linen, silk, or cotton since they absorb sweat better than other materials
                - Pack a water bottle to stay hydrated`
    },
    "feels_like_low": {
        compare: function(data) {
            if (data <= this.low && data >= this.mid) {
                return 0;
            } else if (data <= this.mid && data >= this.hi) {
                return 1;
            } else if (data <= this.hi) {
                return 2;
            } else {
                return -1
            }
        },
        low: 10,
        mid: 0,
        hi: -10,

        lowColor: "#35fcc1",
        midColor: "#35cefc",
        hiColor: "#3699f5",

        lowTitle: "Cool weather",
        midTitle: "Cold weather",
        hiTitle: "Very cold weather",

        lowMsg: `It's going to be a little chilly here, dress warmly.`,
        midMsg: `It's going to be cold here, dress warmly and remember to wear multiple layers.
                 Wear a hat, gloves, and insulated boots.`,
        hiMsg: `It is extremely cold here. Some tips for staying warm:
                - Wear multiple layers, with inner layers keeping you insulated, dry, and warm
                - Your outer layer should consist of heavy duty clothing that can protect you from rain, wind, and snow
                - Remember to keep your appendages insulated to prevent frostnip and frostbite
                - Try to avoid spending too long outside, pack water to stay hydrated`
    },
    "humidity": {
        compare: function(data) {
            if (data >= this.low && data <= this.mid) {
                return 0;
            } else if (data >= this.hi) {
                return 2;
            } else {
                return -1
            }
        },
        low: 0,
        mid: 0.25,
        hi: 0.50,

        lowColor: "#bdffc4",
        midColor: "#9fd6a4",
        hiColor: "#79a37d",

        lowTitle: "Dry conditions",
        hiTitle: "Wet conditions",

        lowMsg: `dry`,
        hiMsg: `wet`
    },
    "pop": {
        compare: function(data) {
            if (data >= this.low && data <= this.mid) {
                return 0;
            } else if (data >= this.mid && data <= this.hi) {
                return 1;
            } else if (data >= this.hi) {
                return 2;
            } else {
                return -1
            }
        },
        low: 0.15,
        mid: 0.5,
        hi: 0.7,

        lowColor: "#cfcfcf",
        midColor: "#a8a8a8",
        hiColor: "#949494",

        lowTitle: "Slight risk of rain",
        midTitle: "Medium risk of rain",
        hiTitle: "High risk of rain",

        lowMsg: `proly won't rain`,
        midMsg: `might rain`,
        hiMsg: `gonna rain`
    },
    "uvi": {
        compare: function(data) {
            if (data >= this.mid && data <= this.hi) {
                return 1;
            } else if (data >= this.hi) {
                return 2;
            } else {
                return -1
            }
        },
        mid: 4,
        hi: 7,

        midColor: "#fbff7a",
        hiColor: "#b854ff",

        midTitle: "mid uvi",
        hiTitle: "high uvi",

        midMsg: `mid uvi`,
        hiMsg: `high uvi`
    },
    "visibility": {
        compare: function(data) {
            if (data <= this.low) {
                return 1;
            } else if (data >= this.low && data <= this.mid) {
                return 2;
            } else {
                return -1
            }
        },
        low: 2500,
        mid: 5000,

        lowColor: "#9c9c9c",
        midColor: "#c4c4c4",

        lowTitle: "Very low visibility",
        midTitle: "Low visibility",

        lowMsg: `fog or mist be careful`,
        midMsg: `humidity hazy kinda low visibility`,

    },
    "wind_speed": {
        compare: function(data) {
             if (data >= this.mid && data <= this.hi) {
                return 1;
            } else if (data >= this.hi) {
                return 2;
            } else {
                return -1
            }
        },
        mid: 18,
        hi: 35,

        midColor: "#85ff33",
        hiColor: "#ffc533",

        midTitle: "Moderately windy",
        hiTitle: "High winds",

        midMsg: `windy`,
        hiMsg: `Very windy, could get dangerous`
    }
}



export default class WeatherTips extends React.Component {
    constructor(props) {
        super(props);
    }

    generateWeatherTips = () => {
        let weatherTips = [];
        let title, msg, color;
        const data = this.props.summary;
        for (let key of Object.keys(this.props.summary)) {
            let dataType = tips[key].compare(data[key]);
            if (dataType === 0) {
                title = tips[key].lowTitle;
                msg = tips[key].lowMsg;
                color = tips[key].lowColor;
            } else if (dataType === 1) {
                title = tips[key].midTitle;
                msg = tips[key].midMsg;
                color = tips[key].midColor;
            } else if (dataType === 2) {
                title = tips[key].hiTitle;
                msg = tips[key].hiMsg;
                color = tips[key].hiColor;
            }

            if (title !== "" && dataType !== -1) {
                weatherTips.push(
                    <Card id = "tipWrapper">
                        <Card.Header style = {{backgroundColor: color}} id = "tipHeader">{title}</Card.Header>
                        <Card.Body id = "tipBody">{msg}</Card.Body>
                    </Card>

                )
            }

        }
        return weatherTips;
    }

    render() {
        return (
            <div id="tipCollection">
                <div id = "timeHeader">{this.props.startTime} to {this.props.endTime}</div>
                {this.generateWeatherTips()}
            </div>
        );
  }
}