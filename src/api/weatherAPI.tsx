import React from "react";
import axios from "axios";
import { weatherData, forecastDay } from "../types/weatherTypes";
import getWeatherEmoji from "../utils/getWeatherEmoji";

const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
const baseURL = "https://api.weatherapi.com/v1/forecast.json";
const getWeather = async (location: string) => {
  try {
    const res = await axios.get(baseURL, {
      params: {
        key: apiKey,
        q: location,
        days: 5,
        aqi: "yes",
      },
    });
    const data = res.data;
    //console.log(data);
    const current: weatherData = {
      city: data.location.name,
      temperature: data.current.temp_c,
      desc: data.current.condition.text,
      rainChance: data.forecast.forecastday[0].day.daily_chance_of_rain,
      uvIdx: data.current.uv,
      humidity: data.current.humidity,
      windSpeed: data.current.wind_kph,
      //icon: "https:" + data.current.condition.icon,
      icon: getWeatherEmoji(data.current.condition.text, data.current.is_day === 1),
      isDay: data.current.is_day === 1,
      aqi: data.current.air_quality["us-epa-index"], 
      
    };

    const forecast: forecastDay[] = data.forecast.forecastday.map((day: any) => {
      // Parse sunrise and sunset
      const [sunriseHour, sunriseMin, sunriseAMPM] = day.astro.sunrise.match(/(\d+):(\d+) (\w+)/)!.slice(1);
      const [sunsetHour, sunsetMin, sunsetAMPM] = day.astro.sunset.match(/(\d+):(\d+) (\w+)/)!.slice(1);
      const to24Hour = (hour: string, ampm: string) => {
        let h = parseInt(hour);
        if (ampm === "PM" && h !== 12) h += 12;
        if (ampm === "AM" && h === 12) h = 0;
        return h;
      };
      const sunriseDate = new Date();
      sunriseDate.setHours(to24Hour(sunriseHour, sunriseAMPM), parseInt(sunriseMin), 0);
      const sunsetDate = new Date();
      sunsetDate.setHours(to24Hour(sunsetHour, sunsetAMPM), parseInt(sunsetMin), 0);
      const diffMs = sunsetDate.getTime() - sunriseDate.getTime();
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const dayLength = `${hours}h ${minutes}m`;
      return {
        date: day.date,
        day: new Date(day.date).toLocaleDateString("en-US", { weekday: "long" }),
        temperature: day.day.avgtemp_c,
        desc: day.day.condition.text,
        icon: "https:" + day.day.condition.icon,
        sunrise: day.astro.sunrise,
        sunset: day.astro.sunset,
        dayLength,
        hour: day.hour.map((h: any) => ({
          time: h.time,
          temp_c: h.temp_c,
          time_epoch: h.time_epoch,
          chance_of_rain: h.chance_of_rain,
          condition: {
            text: h.condition.text,
            icon: "https:" + h.condition.icon,
          },
        })),
      };
    });
    return { current, forecast };
  } catch (err) {
    console.error("Error fetching weather:", err);
    return null;
  }
};
export default getWeather;
