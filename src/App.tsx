import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useState, useEffect } from "react";
import './styles/colors.css';
//import {Container} from "react-bootstrap";
import { weatherData, forecastDay } from "./types/weatherTypes";
import  NavBar  from './components/NavBar';
import WeatherCard from "./components/weatherCard";
import ForecastCard from './components/forecastCard';
import Footer from './components/footer';
import './App.css';
import getWeather from './api/weatherAPI';

function App() {
  const [weather, setWeather]=useState<weatherData | null>(null);
  const [forecast, setForecast]=useState<forecastDay[]>([]);
  const [location, setLocation]=useState("Amritsar"); // default city
  const [searchTerm, setSearchTerm] = useState(""); // search bar input
  const [loading, setLoading] = useState(false); // loading state
  // const weather:weatherData = {
  //   city:"Amritsar",
  //   temperature:20,
  //   desc:"Sunny"
  // }
  useEffect(()=>{
    const fetchData = async()=>{
      const data= await getWeather(location);
      if(data){
        setWeather(data.current);
        setForecast(data.forecast);
      }
    };
    fetchData();
  },[location]);

  return (
    <div className="main-page text-center ">
      <NavBar onSearch={(city)=>setLocation(city)}/>
      <h1 className='h1-type head'>🌤️ Weather Dashboard</h1>
      <p className="sub-head">Last updated: {new Date().toLocaleString()}</p>
      {weather && <WeatherCard data={weather} />}
      {forecast.length > 0 && <ForecastCard forecast={forecast} />}
       <Footer />
    </div>
  );
}

export default App;