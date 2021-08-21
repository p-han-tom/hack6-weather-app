import axios from "axios";
import React from "react";
import { Row, Col, Accordion, ListGroup } from "react-bootstrap";

const tips = {
    "feels_like_high": {
        compare: function (data) {
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
                - Wear light-coloured fabrics to reflect sunlight.
                - Wear natural fibre fabrics such as linen, silk, or cotton since they absorb sweat better than other materials.
                - Pack a water bottle to stay hydrated.`
    },
    "feels_like_low": {
        compare: function (data) {
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
                - Wear multiple layers, with inner layers keeping you insulated, dry, and warm.
                - Your outer layer should consist of heavy duty clothing that can protect you from rain, wind, and snow.
                - Remember to keep your appendages insulated to prevent frostnip and frostbite.
                - Try to avoid spending too long outside, pack water to stay hydrated.`
    },
    "humidity": {
        compare: function (data) {
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

        lowMsg: `Low humidity (especially if paired with cold weather) can cause congestion, nosebleeds, coughing.`,
        hiMsg: `High humidity prevents sweat from evaporating easily. Wear loose-fitting clothes for better air circulation.`
    },
    "pop": {
        compare: function (data) {
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

        lowMsg: `The chance for precipitation is low, no need to worry about heavy rain. Might want to bring an umbrella just in case.`,
        midMsg: `There is a decent chance it will rain. If you're going outside, consider bringing rain gear and an umbrella.`,
        hiMsg: `With such a high chance for precipitation, you should definitely prepare for rain. Rain gear and an umbrella are recommended if you plan to go outside.`
    },
    "uvi": {
        compare: function (data) {
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

        midTitle: "Moderate UV",
        hiTitle: "High UV",

        midMsg: `There is a moderate risk of skin damage from unprotected exposure. Dress in light clothes that cover as much skin as possible (long sleeves and pants), and wear head protection. Sunscreen with an SPF of 30 is recommended.`,
        hiMsg: `There is a high risk of skin damage from unprotected exposure. Wear long sleeved clothing, and a wide-brimmed hat to protect your face, neck, and ears. Sunglasses should be worn, and sunscreen with 30 SPF is heavily recommended.`
    },
    "visibility": {
        compare: function (data) {
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

        lowMsg: `With such low visibility, you should be careful when outside (especially when operating motor vehicles). If you are driving in such conditions, turn on low-beam/fog lights. Drive slowly, and be careful when braking. Be careful of condensation on your windshield.`,
        midMsg: `Lowered visibility, but unlikely to be foggy. Remain vigilant if you are operating a vehicle.`,

    },
    "wind_speed": {
        compare: function (data) {
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

        midTitle: "Moderate breeze",
        hiTitle: "Strong breeze",

        midMsg: `Windy enough to sway trees. Noticeable impediment when walking against the wind. No danger is posed, but dress accordingly.`,
        hiMsg: `Very windy, twigs breaking off trees. Walking against the wind is very difficult. Could be dangerous if the winds get any larger. It is recommended to not venture outside.`
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
                    <Accordion defaultActiveKey='0' id="tipWrapper">
                        <Accordion.Item style = {{backgroundColor: color}} id="tipHeader">
                            <Accordion.Header>{title}</Accordion.Header>
                            <Accordion.Body style = {{backgroundColor: "white"}}>
                                {msg}
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>

                )
            }

        }
        return weatherTips;
    }

    render() {
        return (
            <div id="tipCollection">
                <div id="timeHeader">{this.props.startTime} to {this.props.endTime}</div>
                {this.generateWeatherTips()}
            </div>
        );
    }
}