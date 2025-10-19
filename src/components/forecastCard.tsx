import React from "react";
import {forecastDay} from "../types/weatherTypes";
interface ForecastProps{
    forecast : forecastDay[];
}
const ForecastCard: React.FC<ForecastProps> = ({forecast}) => {
    
    return(
        <div className="forecast-card container ">
            <div className="forecast-card-body p-4">
                <div className="row gx-5 g-4">
                    <div className="col-lg-7 p-0">
                        <div className="forecast p-4">
                        <div className="row p-4">
                            <div className="col-lg-8 text-start">
                                <h3 className="h3-type head">Today/Week</h3>
                                <br/>
                                <div className="row today-forecast p-2 m-2">
                                    {/* {forecast[0]?.hour.slice(12,18).map((hourData,index)=>(
                                            <div className="col-lg-2 show-temperature">
                                            <p className="sub-head">
                                            {new Date(hourData.time_epoch * 1000).getHours() % 12 || 12}
                                            {new Date(hourData.time_epoch * 1000).getHours() >= 12 ? "PM" : "AM"}
                                            </p>
                                            <p><img src={hourData.condition.icon} alt={hourData.condition.text} width="40"/></p>
                                            <p className="sub-head">{Math.round(hourData.temp_c)}°C</p>
                                            </div>
                                    ))
                                    } */}
                                        {(() => {  //IIFE function exp
                                             if (!forecast[0]?.hour) return null;
                                             const currentLocalTime = new Date().getHours();

  // get current local time in hours (0–23)
                                            //const now = new Date().getHours();

  // create a list of next 5 hours (wrapping around 24)
                                            const nextFiveHours: number[] = [];
                                            for (let i = 1; i <= 6; i++) {
                                             nextFiveHours.push((currentLocalTime + i) % 24);
                                            }
                                            // Find corresponding forecast data for those 5 hours
                      const hourDataList = nextFiveHours
                      .map((targetHour) =>
                        forecast[0].hour.find(
                          (h: any) =>
                            new Date(h.time).getHours() === targetHour
                        )
                      )
                      .filter(Boolean); // remove undefined if missing data
                      const filledHourData =
                      hourDataList.length < 5
                        ? [
                            ...hourDataList,
                            ...forecast[0].hour.slice(0, 5 - hourDataList.length),
                          ]
                        : hourDataList;
  // filter the hours from the API based on those 5 hour values
                                          
  return filledHourData.map((hourData: any, index: number) => (
    <div className="col-lg-2 show-temperature" key={index}>
      <p className="sub-head">
        {(() => {
          const hour = new Date(hourData.time).getHours();
          const formattedHour = hour % 12 || 12;
          const ampm = hour >= 12 ? "PM" : "AM";
          return `${formattedHour}${ampm}`;
        })()}
      </p>
      <p>
        <img
          src={hourData.condition.icon}
          alt={hourData.condition.text}
          width="40"
        />
      </p>
      <p className="sub-head">
        {Math.round(hourData.temp_c)}°C
      </p>
    </div>
  ));
})()}
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
                                    <h4 className="head">{forecast[0]?.dayLength}</h4>
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