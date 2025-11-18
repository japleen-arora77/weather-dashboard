import React, { useEffect, useState } from "react";
import { forecastDay, weatherData } from "../types/weatherTypes";
import getWeather from "../api/weatherAPI"; 
import getWeatherEmoji from "../utils/getWeatherEmoji";

interface ForecastProps{ 
    forecast : forecastDay[];
}
const otherCities=["Vancouver","Melbourne","Hyderabad","Bangalore","Pune","Jaipur" ];
const ForecastCard: React.FC<ForecastProps> = ({forecast}) => {
    const [otherCitiesWeather, setOtherCitiesWeather] = useState<weatherData[]>([]);
    const [loadingCities, setLoadingCities] = useState(true);

    useEffect(()=>{
        const fetchOtherCities=async()=>{
            const res:weatherData[] = [];
            for(const i of otherCities){
                const data=await getWeather(i);
                if(data) res.push(data.current);
            }
            setOtherCitiesWeather(res);
            setLoadingCities(false);
        };
        fetchOtherCities();
    })
// Get today's sunrise & sunset times
const sunriseTime = new Date(`1970-01-01T${forecast[0]?.sunrise}`);
const sunsetTime = new Date(`1970-01-01T${forecast[0]?.sunset}`);

// Determine if current time is day or night (for main weather & other cities)
const isDay = (() => {
  const now = new Date();
  const local = new Date(`1970-01-01T${now.getHours().toString().padStart(2, "0")}:${now
    .getMinutes()
    .toString()
    .padStart(2, "0")}:00`);
  return local >= sunriseTime && local < sunsetTime;
})();

// Check if a *forecasted hour* falls in the day or night, based on sunrise/sunset
const checkIsDay = (timeString: string): boolean => {
  if (!forecast[0]?.sunrise || !forecast[0]?.sunset) return true; // default to day if missing data
  const hourTime = new Date(`1970-01-01T${new Date(timeString).toTimeString().split(" ")[0]}`);
  return hourTime >= sunriseTime && hourTime < sunsetTime;
};

    return(
        <div className="forecast-card container ">
            <div className="forecast-card-body p-4">
                <div className="row gx-5 g-4">
                    <div className="col-lg-7 p-0">
                        <div className="forecast p-4" data-aos="fade-left">
                        <div className="row p-4">
                            <div className="col-lg-8 text-start" >
                                <h3 className="h3-type head">Today/Tomorrow</h3>
                                <br/>
                                <div className="row today-forecast p-2 m-2">
                                        {(() => {  //IIFE exp
                                             if (!forecast[0]?.hour) return null;
                                             const currentLocalTime = new Date().getHours();
                                            const nextFiveHours: number[] = [];
                                            for (let i = 1; i <= 6; i++) { //forecast for next 6 hours 
                                             nextFiveHours.push((currentLocalTime + i) % 24);
                                            }
                                        const hourDataList = nextFiveHours.map((targetHour) =>
                                          forecast[0].hour.find(
                                            (h: any) =>
                                              new Date(h.time).getHours() === targetHour
                                          )
                                        )
                                        .filter(Boolean);
                                        const filledHourData=hourDataList.length < 5
                                          ? [
                                              ...hourDataList,
                                              ...forecast[0].hour.slice(0, 5 - hourDataList.length),
                                            ]
                                         : hourDataList;
                                //6 hour values
                            return filledHourData.map((hourData: any, index: number) => (
                                 <div className="col-lg-2 col-md-2 col-sm-2 col-sx-2 show-temperature" key={index}>
                                      <p className="sub-head">
                                        {(() => {
                                          const hour = new Date(hourData.time).getHours();
                                          const formattedHour = hour % 12 || 12;
                                          const ampm = hour >= 12 ? "PM" : "AM";
                                          return `${formattedHour}${ampm}`;
                                        })()}
                                     </p>
                                      <p>
                                        <h1 style={{ fontSize: "1.4rem" }}>
                                        {getWeatherEmoji(hourData.condition.text, checkIsDay(hourData.time))}

                                        </h1>
                                      </p>
                                      <p className="sub-head">
                                        {Math.round(hourData.temp_c)}°C
                                      </p>
                                    </div>
                                ));
                                })()}
                                </div>
                                {/*next day forecast*/}
                                <div className="row further-days-forecast p-2 m-2">
                                    <div className="row">
                                        <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                            <p className="head">{forecast[1]?.day}</p>
                                            <h4 className="head">{forecast[1]?.temperature}℃</h4>
                                            <p className="sub-head">{forecast[1]?.desc}</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                        <h1 style={{ fontSize: "4rem" }}>
                                            {getWeatherEmoji(forecast[1]?.desc, isDay)}
                                        </h1>
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
                                    <h4 className="head">{forecast[0]?.dayLength}</h4>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="col-lg-5 text-start" >
                    <div className="other-cities p-4" data-aos="fade-left">   
                    <h3 className="h3-type head">Other Cities</h3>
                    {loadingCities ? (
                     <p className="sub-head">Loading cities....</p>
                    ):( 
                        <> 
                    <div className="row p-3">
                    {otherCitiesWeather.slice(0, 2).map((city, index) => (
                      <div key={index} className="col-lg-6 col-md-6 col-sm-6 col-sx-6">
                        <div className="other-city-data p-3">
                          <div className="row">
                            <div className="col-lg-7">
                              <h4 className="h4-type head">{Math.round(city.temperature)}℃</h4>
                              <p className="sub-head">{city.city}</p>
                            </div>
                            <div className="col-lg-5 head">
                            <h1 className="emoji" style={{ fontSize: "1.8rem" }}>
                              {getWeatherEmoji(city.desc, isDay)}
                            </h1>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="row p-3">
                    {otherCitiesWeather.slice(2, 4).map((city, index) => (
                      <div key={index} className="col-lg-6 col-md-6 col-sm-6 col-sx-6">
                        <div className="other-city-data p-3">
                          <div className="row">
                            <div className="col-lg-7">
                              <h4 className="h4-type head">{Math.round(city.temperature)}℃</h4>
                              <p className="sub-head">{city.city}</p>
                            </div>
                            <div className="col-lg-5 head">
                            <h1 style={{ fontSize: "1.8rem" }}>
                              {getWeatherEmoji(city.desc, isDay)}
                            </h1>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="row p-3">
                    {otherCitiesWeather.slice(4, 6).map((city, index) => (
                      <div key={index} className="col-lg-6 col-md-6 col-sm-6 col-sx-6"> 
                        <div className="other-city-data p-3">
                          <div className="row">
                            <div className="col-lg-7">
                              <h4 className="h4-type head">{Math.round(city.temperature)}℃</h4>
                              <p className="sub-head">{city.city}</p>
                            </div>
                            <div className="col-lg-5 head">
                            <h1 style={{ fontSize: "1.8rem" }}>
                              {getWeatherEmoji(city.desc, isDay)}
                            </h1>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                    </>
                    )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ForecastCard;