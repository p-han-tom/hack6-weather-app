(this["webpackJsonphack6-weather-app"]=this["webpackJsonphack6-weather-app"]||[]).push([[0],{55:function(e,i,t){},56:function(e,i,t){},79:function(e,i,t){"use strict";t.r(i);var r=t(0),o=t.n(r),a=t(9),s=t.n(a),n=(t(55),t(16)),l=t(23),d=t(24),h=t(21),c=t(20),m=(t(56),t(31)),u=t.n(m),g=t(89),p=t(1),b={feels_like_high:{compare:function(e){return e>=this.low&&e<=this.mid?0:e>=this.mid&&e<=this.hi?1:e>=this.hi?2:-1},low:20,mid:25,hi:30,lowColor:"#bff542",midColor:"#ff9b3d",hiColor:"#ff4238",lowTitle:"Warm weather",midTitle:"Hot weather",hiTitle:"Very hot weather",lowMsg:"It's going to be a warm here, so don't dress too warm yourself.",midMsg:"It's going to get hot here. Consider wearing short-sleeved, light-weight attire to stay cool. Also, remember to stay hydrated.",hiMsg:"It's going to be very hot here. Here are some tips:\n                - Wear loose-fitting, short-sleeved clothes for better air circulation \n                - Wear light-coloured fabrics to reflect sunlight\n                - Wear natural fibre fabrics such as linen, silk, or cotton since they absorb sweat better than other materials\n                - Pack a water bottle to stay hydrated"},feels_like_low:{compare:function(e){return e<=this.low&&e>=this.mid?0:e<=this.mid&&e>=this.hi?1:e<=this.hi?2:-1},low:10,mid:0,hi:-10,lowColor:"#35fcc1",midColor:"#35cefc",hiColor:"#3699f5",lowTitle:"Cool weather",midTitle:"Cold weather",hiTitle:"Very cold weather",lowMsg:"It's going to be a little chilly here, dress warmly.",midMsg:"It's going to be cold here, dress warmly and remember to wear multiple layers.\n                 Wear a hat, gloves, and insulated boots.",hiMsg:"It is extremely cold here. Some tips for staying warm:\n                - Wear multiple layers, with inner layers keeping you insulated, dry, and warm\n                - Your outer layer should consist of heavy duty clothing that can protect you from rain, wind, and snow\n                - Remember to keep your appendages insulated to prevent frostnip and frostbite\n                - Try to avoid spending too long outside, pack water to stay hydrated"},humidity:{compare:function(e){return e>=this.low&&e<=this.mid?0:e>=this.hi?2:-1},low:0,mid:.25,hi:.5,lowColor:"#bdffc4",midColor:"#9fd6a4",hiColor:"#79a37d",lowTitle:"Dry conditions",hiTitle:"Wet conditions",lowMsg:"dry",hiMsg:"wet"},pop:{compare:function(e){return e>=this.low&&e<=this.mid?0:e>=this.mid&&e<=this.hi?1:e>=this.hi?2:-1},low:.15,mid:.5,hi:.7,lowColor:"#cfcfcf",midColor:"#a8a8a8",hiColor:"#949494",lowTitle:"Slight risk of rain",midTitle:"Medium risk of rain",hiTitle:"High risk of rain",lowMsg:"proly won't rain",midMsg:"might rain",hiMsg:"gonna rain"},uvi:{compare:function(e){return e>=this.mid&&e<=this.hi?1:e>=this.hi?2:-1},mid:4,hi:7,midColor:"#fbff7a",hiColor:"#b854ff",midTitle:"mid uvi",hiTitle:"high uvi",midMsg:"mid uvi",hiMsg:"high uvi"},visibility:{compare:function(e){return e<=this.low?1:e>=this.low&&e<=this.mid?2:-1},low:2500,mid:5e3,lowColor:"#9c9c9c",midColor:"#c4c4c4",lowTitle:"Very low visibility",midTitle:"Low visibility",lowMsg:"fog or mist be careful",midMsg:"humidity hazy kinda low visibility"},wind_speed:{compare:function(e){return e>=this.mid&&e<=this.hi?1:e>=this.hi?2:-1},mid:18,hi:35,midColor:"#85ff33",hiColor:"#ffc533",midTitle:"Moderately windy",hiTitle:"High winds",midMsg:"windy",hiMsg:"Very windy, could get dangerous"}},f=function(e){Object(h.a)(t,e);var i=Object(c.a)(t);function t(e){var r;return Object(n.a)(this,t),(r=i.call(this,e)).generateWeatherTips=function(){for(var e,i,t,o=[],a=r.props.summary,s=0,n=Object.keys(r.props.summary);s<n.length;s++){var l=n[s],d=b[l].compare(a[l]);0===d?(e=b[l].lowTitle,i=b[l].lowMsg,t=b[l].lowColor):1===d?(e=b[l].midTitle,i=b[l].midMsg,t=b[l].midColor):2===d&&(e=b[l].hiTitle,i=b[l].hiMsg,t=b[l].hiColor),""!==e&&-1!==d&&o.push(Object(p.jsxs)(g.a,{id:"tipWrapper",children:[Object(p.jsx)(g.a.Header,{style:{backgroundColor:t},id:"tipHeader",children:e}),Object(p.jsx)(g.a.Body,{id:"tipBody",children:i})]}))}return o},r}return Object(l.a)(t,[{key:"render",value:function(){return Object(p.jsxs)("div",{id:"tipCollection",children:[Object(p.jsxs)("div",{id:"timeHeader",children:[this.props.startTime," to ",this.props.endTime]}),this.generateWeatherTips()]})}}]),t}(o.a.Component),w=t(87),j=t(49),y=t(88),v=t(84),O=t(85),x=t(86),C={Rain:"linear-gradient(rgb(230, 230, 230), rgb(158, 224, 255))",Clear:"linear-gradient(rgb(250, 217, 0),  rgb(255, 255, 255))",Clouds:"linear-gradient(rgb(223, 223, 223), rgb(235, 235, 235))",Snow:"linear-gradient(rgb(147, 221, 255), rgb(134, 209, 253))"},T=function(e){Object(h.a)(t,e);var i=Object(c.a)(t);function t(e){var r;return Object(n.a)(this,t),(r=i.call(this,e)).setLocation=function(e){r.setState({lat:e.coords.latitude}),r.setState({lon:e.coords.longitude}),void 0!==r.state.lat&&void 0!==r.state.lon&&r.getWeather()},r.getWeather=function(){var e={method:"GET",url:"https://api.openweathermap.org/data/2.5/onecall?",params:{lat:r.state.lat,lon:r.state.lon,exclude:"current,minutely,daily",units:"metric",appid:"42c4cec649a8aa4d05bdce1c50f350c0"}},i=Object(d.a)(r);u.a.request(e).then((function(e){i.setState({weather:e.data}),console.dir(e.data,{depth:null})})).catch((function(e){console.error(e)}))},r.parseTime=function(e){var i=new Date(1e3*e).getHours(),t=i>11?"PM":"AM";return(i=i<10?"0"+i:i)+":00 "+t},r.updateHeaderClock=function(){var e=new Date,i=e.getHours(),t=e.getMinutes(),o=e.getSeconds(),a=i+":"+(t=t<10?"0"+t:t)+":"+(o=o<10?"0"+o:o)+" "+(i>11?"PM":"AM");r.setState({time:a})},r.generateHourlyReport=function(){for(var e=[],i=r.state.weather.hourly,t=0;t<12;t++)e.push(Object(p.jsxs)("div",{id:"weather-cards",children:[Object(p.jsx)(w.a,{placement:"right",overlay:Object(p.jsx)(j.a,{children:Object(p.jsxs)(j.a.Body,{children:[Object(p.jsxs)("div",{children:["Temperature: ",i[t].temp,"\xb0C"]}),Object(p.jsxs)("div",{children:["Feels Like: ",i[t].feels_like,"\xb0C"]})]})}),children:Object(p.jsx)(g.a,{className:"hour-cards",children:Object(p.jsxs)(g.a.Header,{style:{background:i[t].weather[0].main>=700&&i[t].weather[0].main<800?C[i[t].weather[0].main]:C.Clouds},children:[Object(p.jsx)("div",{id:"hour-header",children:r.parseTime(i[t].dt)}),Object(p.jsx)("img",{id:"weather-icons",src:"http://openweathermap.org/img/wn/"+i[t].weather[0].icon+"@2x.png",alt:""}),Object(p.jsxs)("p",{style:{fontSize:"0.75em"},children:[Math.round(i[t].temp),"\xb0C"]})]})})}),Object(p.jsx)(y.a,{defaultActiveKey:"0",children:Object(p.jsxs)(y.a.Item,{children:[Object(p.jsxs)(y.a.Header,{children:["P.O.P: ",100*i[t].pop,"%"]}),Object(p.jsxs)(y.a.Body,{children:[Object(p.jsxs)("div",{children:["Humidity: ",i[t].humidity,"%"]}),Object(p.jsxs)("div",{children:["UV Index: ",i[t].uvi]}),Object(p.jsxs)("div",{children:["Visibility: ",i[t].visibility/1e3,"km"]}),Object(p.jsxs)("div",{children:["Wind: ",i[t].wind_speed,"km/h"]})]})]})})]}));return e},r.generateWeatherTips=function(){for(var e=[],i=[],t=0;t<3;t++)i.push({feels_like_high:-1e3,feels_like_low:1e3,humidity:-1e3,pop:-1e3,uvi:0,visibility:0,wind_speed:0});for(var o=r.state.weather.hourly,a=0;a<9;a+=4){for(var s=0;s<4;s++)i[a/4].feels_like_high=Math.max(o[a+s].feels_like,i[a/4].feels_like_high),i[a/4].feels_like_low=Math.min(o[a+s].feels_like,i[a/4].feels_like_low),i[a/4].humidity=Math.max(o[a+s].humidity,i[a/4].humidity),i[a/4].pop=Math.max(o[a+s].pop,i[a/4].pop),i[a/4].uvi=Math.max(o[a+s].uvi,i[a/4].uvi),i[a/4].visibility=Math.max(o[a+s].visibility,i[a/4].visibility),i[a/4].wind_speed=Math.max(o[a+s].wind_speed,i[a/4].wind_speed);e.push(Object(p.jsx)(f,{summary:i[a/4],startTime:r.parseTime(o[a].dt),endTime:r.parseTime(o[a].dt+10800)}))}return e},r.state={weather:{},lat:void 0,lon:void 0},navigator.geolocation.getCurrentPosition(r.setLocation,(function(){})),setInterval(r.updateHeaderClock,1e3),r}return Object(l.a)(t,[{key:"render",value:function(){return Object.keys(this.state.weather).length>0?Object(p.jsxs)("div",{id:"parallax",children:[Object(p.jsx)(v.a,{children:Object(p.jsx)(O.a,{id:"greeting",children:this.state.time})}),Object(p.jsxs)(v.a,{children:[Object(p.jsx)(O.a,{children:this.generateHourlyReport()}),Object(p.jsx)(O.a,{children:this.generateWeatherTips()})]})]}):Object(p.jsxs)("div",{id:"loadingPrompt",children:[Object(p.jsx)(x.a,{animation:"border"}),Object(p.jsx)("span",{style:{fontSize:"3em"},children:" Loading"})]})}}]),t}(o.a.Component),M=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,90)).then((function(i){var t=i.getCLS,r=i.getFID,o=i.getFCP,a=i.getLCP,s=i.getTTFB;t(e),r(e),o(e),a(e),s(e)}))};s.a.render(Object(p.jsx)(o.a.StrictMode,{children:Object(p.jsx)(T,{})}),document.getElementById("root")),M()}},[[79,1,2]]]);
//# sourceMappingURL=main.7d4c233c.chunk.js.map