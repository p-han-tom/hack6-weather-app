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
        low: 5,
        mid: -5,
        hi: -15,

        lowTitle: "Cool weather",
        midTitle: "Cold weather",
        hiTitle: "Very cold weather",

        lowMsg: `Cool`,
        midMsg: `cold`,
        hiMsg: `very cold`
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

        lowTitle: "Dry conditions",
        hiTitle: "Wet conditions",

        lowMsg: `dry`,
        hiMsg: `wet`
    },
    "pop": {
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
        low: 0.15,
        mid: 0.5,
        hi: 0.7,

        lowTitle: "Slight risk of rain",
        midTitle: "Medium risk of rain",
        hiTitle: "High risk of rain",

        lowMsg: `proly won't rain`,
        midMsg: `might rain`,
        hiMsg: `gonna rain`
    },
    "uvi": {
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
        low: 20,
        mid: 25,
        hi: 30,

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
    "visibility": {
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
        low: 20,
        mid: 25,
        hi: 30,

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
    "wind_speed": {
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
        low: 20,
        mid: 25,
        hi: 30,

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
    }
}



export default class WeatherTips extends React.Component {
    constructor(props) {
        super(props);
    }

    generateWeatherTips = () => {
        let weatherTips = [];
        let title, msg;
        let key = "feels_like_high";
        const data = this.props.summary;
        for (let key of Object.keys(this.props.summary)) {
            let dataType = tips[key].compare(data[key]);
            if (dataType === 0) {
                title = tips[key].lowTitle;
                msg = tips[key].lowMsg;
            } else if (dataType === 1) {
                title = tips[key].midTitle;
                msg = tips[key].midMsg;
            } else if (dataType === 2) {
                title = tips[key].hiTitle;
                msg = tips[key].hiMsg;
            }

            if (title !== "" && dataType !== -1) {
                weatherTips.push(
                    <Card>
                        <Card.Header>{title}</Card.Header>
                        <Card.Body>{msg}</Card.Body>
                    </Card>

                )
            }

        }
        return weatherTips;
    }

    render() {
        return (
            <div id="tipsWrapper">
                {this.generateWeatherTips()}
                <br></br>
            </div>
        );
  }
}