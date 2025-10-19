import {forecastDay} from "../types/weatherTypes";
interface ForecastProps{
    forecast : forecastDay[];
}
const ForecastCard: React.FC<ForecastProps> = ({forecast}) => {
    return(
        <div className="forecast-card container ">
            <div className="forecast-card-body p-4">

            {/* {forecast.length > 0 && (
          <div className="d-none">
            {forecast.map((f, index) => (
              <p key={index}>
                {f.day}: {f.temperature}°C - {f.desc}
              </p>
            ))}
          </div>
        )}   */}

                <div className="row gx-5 g-4">
                    <div className="col-lg-7 p-0">
                        <div className="forecast p-4">
                        <div className="row p-4">
                            <div className="col-lg-8 text-start">
                                <h3 className="h3-type head">Today/Week</h3>
                                <br/>
                                <div className="row today-forecast p-2 m-2">
                                    {forecast[0]?.hour.slice(12,18).map((hourData,index)=>(
                                            <div className="col-lg-2 show-temperature">
                                            <p className="sub-head">
                                            {new Date(hourData.time_epoch * 1000).getHours() % 12 || 12}
                                            {new Date(hourData.time_epoch * 1000).getHours() >= 12 ? "PM" : "AM"}
                                            </p>
                                            <p><img src={hourData.condition.icon} alt={hourData.condition.text} width="40"/></p>
                                            <p className="sub-head">{Math.round(hourData.temp_c)}°C</p>
                                            </div>
                                    ))
                                    }
                                    

                                </div>
                                <div className="row further-days-forecast p-2 m-2">
                                    <div className="row">
                                        <div className="col-lg-8">
                                            <p className="head">{forecast[1]?.day}</p>
                                            <h4 className="head">{forecast[1]?.temperature}℃</h4>
                                            <p className="sub-head">{forecast[1]?.desc}</p>
                                        </div>
                                        <div className="col-lg-4">
                                            <h1><img src={forecast[1]?.icon} alt={forecast[1]?.desc} width="60"/></h1>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="col-lg-4 day-length p-3 ">
                                <p className="sub-head">Sunrise</p>
                                    <h4 className="h4-type head">{forecast[0]?.sunrise}</h4>
                                <br/>
                                <p className="h4-type sub-head">Sunset</p>
                                    <h4 className="head">{forecast[0]?.sunset}</h4>
                                <br/>
                                <p className="h4-type sub-head">Length of Day</p>
                                    <h4 className="head">10h 53m</h4>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="col-lg-5 text-start">
                    <div className="other-cities ">   
                    <h3 className="h3-type head">Other Cities</h3>
                        <div className="row p-3">
                            <div className="col-lg-6">
                                <div className="other-city-data p-3 ">
                                <div className="row">
                                    <div className="col-lg-7">
                                        <h4 className="h4-type head">14℃</h4>
                                        <p className="sub-head">USA</p>
                                    </div>
                                    <div className="col-lg-5 head">
                                        <h1>🌥️</h1>
                                    </div>
                                </div> 
                                </div>
                            </div>
                            <div className="col-lg-6 p-0">
                            <div className="other-city-data p-3">
                                <div className="row">
                                    <div className="col-lg-7">
                                        <h4 className="h4-type head">27℃</h4>
                                        <p className="sub-head">Dubai</p>
                                    </div>
                                    <div className="col-lg-5">
                                        <h1>🌥️</h1>
                                    </div>
                                </div> 
                                </div>
                            </div>
                        </div>
                        <div className="row p-3 ">
                            <div className="col-lg-6 ">
                            <div className="other-city-data p-3">
                                <div className="row">
                                    <div className="col-lg-7">
                                        <h4 className="h4-type head">16℃</h4>
                                        <p className="sub-head">China</p>
                                    </div>
                                    <div className="col-lg-5">
                                        <h1>🌥️</h1>
                                    </div>
                                </div> 
                                </div>
                            </div>
                            <div className="col-lg-6 p-0">
                            <div className="other-city-data p-3">
                                <div className="row">
                                    <div className="col-lg-7">
                                        <h4 className="h4-type head">26℃</h4>
                                        <p className="sub-head">Canada</p>
                                    </div>
                                    <div className="col-lg-5">
                                        <h1>🌥️</h1>
                                    </div>
                                </div> 
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ForecastCard;