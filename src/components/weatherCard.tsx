import '../styles/weatherCard.css';
import  {weatherData}  from '../types/weatherTypes';
interface WeatherCardProps {
    data: weatherData;
  }
const WeatherCard: React.FC<WeatherCardProps> = ({data}) => {
    return(
        <div className="weather-card container ">
            <div className="weather-card-body p-4 ">
                <div className="row gx-5 g-4">
                    <div className="col-lg-7 p-0">
                        <div className='today-weather p-4'>
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6 col-sx-6 text-start">
                                        <p className="sub-head city-name btn"><i className="bi bi-geo-alt-fill"> </i>{data.city}</p>
                                        <h2 className="h2-type head"> {new Date().toLocaleDateString("en-US", { weekday: "long" })}</h2>
                                        <p className="sub-head"> {new Date().toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}</p>
                                        <br/><br/>
                                        <h1 className="h2-type head">{data.temperature}℃</h1>
                                        <p className="sub-head">{data.desc}</p>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-sx-6 d-flex align-items-center justify-content-center">
                            <div className="icon-type" style={{ fontSize: '80px' }}>
                                {data.icon}
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="col-lg-5  text-start">
                    <div className='today-highlight p-4'>
                        <h3 className="h3-type head">Today's Highlight</h3>
                    <div className="row p-3">
                      <div className="col-lg-6">
                        <div className="head highlight p-3">
                            <div className='row'>Chance of Rain</div><br/>
                            <h3>{data.rainChance}% 🌧️</h3>
                        </div>
                      </div>
                      <div className="col-lg-6 ">
                        <div className="head highlight p-3">
                            <div className='row'>UV Index</div><br/>
                            <h3>{data.uvIdx} 🔆</h3>
                        </div>
                      </div>
                    </div>
                    <div className="row p-3">
                      <div className="col-lg-6">
                        <div className="head highlight p-3">
                            <div className='row'>Wind Speed</div><br/>
                            <h4>{data.windSpeed}km/h🍃</h4>
                        </div>
                      </div>
                      <div className="col-lg-6 ">
                        <div className="head highlight p-3">
                            <div className='row'>Humidity</div><br/>
                            <h3>{data.humidity}% 💧</h3>
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
export default WeatherCard;