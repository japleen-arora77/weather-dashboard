import exp from "constants";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { weatherData, forecastDay } from "../types/weatherTypes";

const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
const baseURL= "https://api.weatherapi.com/v1/forecast.json";
const getWeather = async(location:string)=>{
    try {
        const res = await axios.get(baseURL, {
          params: {
            key: apiKey,
            q: location,
            days: 5,
            aqi: "yes"
          }
        });
        const data = await res.data;
        console.log(data);
        const current: weatherData = {
            city:data.location.name,
            temperature:data.current.temp_c,
            desc:data.current.condition.text,
            rainChance:data.forecast.forecastday[0].day.daily_chance_of_rain,
            uvIdx:data.current.uv,
            humidity:data.current.humidity,
            windSpeed:data.current.wind_kph,
            icon:"https:" + data.current.condition.icon,
        };
        const forecast: forecastDay[] = data.forecast.forecastday.map((day: any) => ({
            date:day.date,
            day:new Date(day.date).toLocaleDateString("en-US", { weekday: "long" }),
            temperature:day.day.avgtemp_c,
            desc:day.day.condition.text,
            icon:"https:" + day.day.condition.icon,
            sunrise:day.astro.sunrise,
            sunset:day.astro.sunset,
            hour: day.hour.map((h:any) =>({
                time:h.time,
                temp_c: h.temp_c,
                time_epoch: h.time_epoch,
                chance_of_rain: h.chance_of_rain,
                condition: {
                    text: h.condition.text,
                    icon: "https:"+h.condition.icon,
            }
        }
        ))

          }));
          return {current,forecast};
    }
    catch(err){
        console.error("Error fetching weather:",err);
        return null;
    }
}
export default getWeather;