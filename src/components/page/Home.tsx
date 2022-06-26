import { Component } from "react";
import { GetDaysWeather, GetWeather } from "../../connection/Req";
import Importer from "../../import/Importer";
import dayjs from "dayjs";
import "./Home.css";

let weekday = new Array(7);
weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
class Home extends Component<
  {},
  {
    city: string;
    temperature: number;
    UV: number;
    wind_dir: string;
    windSpeed: number;
    sixDaysWeather: object[];
    weatherIcon: string;
    weatherText: string;
    dateDay: number;
    dateMonth: string;
  }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      city: "",
      temperature: 0,
      UV: 0,
      wind_dir: "",
      windSpeed: 0,
      sixDaysWeather: [],
      weatherIcon: "",
      weatherText: "",
      dateDay: 0,
      dateMonth: "",
    };
    this.sendData = this.sendData.bind(this);
  }

  handleChange = (event: any) => {
    this.setState({ city: event.target.value });
  };

  sendData(e: any) {
    e.preventDefault();
    var date = new Date();
    GetWeather((data: any) => {
      this.setState({
        city: data.location.name,
        temperature: data.current.temp_c,
        UV: data.current.uv,
        wind_dir: data.current.wind_dir,
        windSpeed: data.current.wind_kph,
        weatherIcon: data.current.condition.icon,
        weatherText: data.current.condition.text,
        dateDay: date.getDate(),
        dateMonth: date.toLocaleString("en-US", { month: "short" }),
      });
    }, this.state.city);
    GetDaysWeather((daysWeather: any) => {
      this.setState({
        sixDaysWeather: daysWeather,
      });
      console.log(daysWeather);
    }, this.state.city);
  }

  render() {
    return (
      <div>
        <div className="hero">
          <div className="container">
            <form className="find-location">
              <input
                onChange={this.handleChange}
                type="text"
                placeholder={this.state.city}
              />
              <input onClick={this.sendData} type="submit" value="Find" />
            </form>
          </div>
        </div>
        <div className="forecast-table">
          <div className="container">
            <div className="forecast-container">
              <div className="today forecast">
                <div className="forecast-header">
                  <div className="day">To Day</div>
                  <div className="date">
                    {this.state.dateDay} {this.state.dateMonth}
                  </div>
                </div>
                {/* <!-- .forecast-header --> */}
                <div className="forecast-content">
                  <div className="location">{this.state.city}</div>
                  <div className="degree">
                    <div className="num">
                      {Math.floor(this.state.temperature)}
                      <sup>o</sup>C
                    </div>
                    <div className="forecast-icon">
                      <img src={this.state.weatherIcon} alt="" width="90" />
                    </div>
                  </div>
                  <div className="location pb-2">{this.state.weatherText}</div>
                  <span>
                    <img src={Importer["icon-umberella.png"]} alt="" />
                    {this.state.UV}%
                  </span>
                  <span>
                    <img src={Importer["icon-wind.png"]} alt="" />
                    {this.state.windSpeed} km/h
                  </span>
                  <span>
                    <img src={Importer["icon-compass.png"]} alt="" />
                    {this.state.wind_dir}
                  </span>
                </div>
              </div>

              {this.state.sixDaysWeather.map((data: any, index: number) => {
                const date: any = dayjs(data.date, "YYYY-MM-DD");
                let dayDate = date["$d"];

                return (
                  <div className="forecast" key={index}>
                    <div className="forecast-header">
                      <div className="day">{weekday[dayDate.getDay()]}</div>
                    </div>

                    {/* <!-- .forecast-header --> */}
                    <div className="forecast-content">
                      <div className="forecast-icon">
                        <img
                          src={data.day.condition.icon}
                          alt="weather icon"
                          width="48"
                        />
                      </div>
                      <small>{data.day.condition.text}</small>
                      <div className="degree">
                        {data.day.maxtemp_c}
                        <sup>o</sup>C
                      </div>
                      <small>
                        {data.day.mintemp_c}
                        <sup>o</sup>C
                      </small>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
