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
                            <div className="col-lg-6 text-start">
                                        <p className="sub-head city-name btn"><i className="bi bi-geo-alt-fill"> </i>{data.city}</p>
                                        <h2 className="h2-type head"> {new Date().toLocaleDateString("en-US", { weekday: "long" })}</h2>
                                        <p className="sub-head"> {new Date().toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}</p>
                                        <br/><br/>
                                        <h2 className="h2-type head">{data.temperature}</h2>
                                        <p className="sub-head">{data.desc}</p>
                            </div>
                            <div className="col-lg-6 d-flex align-items-center justify-content-center">
                            <img
                    src={data.icon}
                    alt="weather icon"
                    className="icon-type"
                    style={{ width: '120px', height: '120px' }}
                  />
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="col-lg-5  text-start">
                        <div className='today-highlight p-4'>
                        <h3 className="h3-type head">Today's Highlight</h3>
                        <div className="row ">
                            <div className="col-lg-6 head highlight">
                                Chance of Rain<br/> {data.rainChance}%
                            </div>
                            <div className="col-lg-6 head highlight">
                                UV Index<br/> {data.uvIdx}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 head highlight">
                                Wind Speed<br/>{data.windSpeed}km/h
                            </div>
                            <div className="col-lg-6 head highlight">
                                Humidity<br/>{data.humidity}%
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