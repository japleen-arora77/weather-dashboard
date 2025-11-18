import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState, useEffect } from "react";
// import AOS from "aos";
// import "aos/dist/aos.css";
import './styles/colors.css';
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
  // useEffect(() => {
  //   AOS.init({
  //     duration: 900,
  //     easing: "ease-out",
  //     once: false,
  //     mirror: true
  //   });
  //   setTimeout(() => {
  //     AOS.refresh();
  //   }, 300);
  // }, []);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getWeather(location);
      if (data) {
        setWeather(data.current);
        setForecast(data.forecast);
      }
    };
    fetchData();
  }, [location]);

  return (
    <div className="main-page text-center ">
      <NavBar onSearch={(city)=>setLocation(city)}/>
      <h1 className='h1-type head' data-aos="zoom-in">🌤️ Weather Dashboard</h1>
      <p className="sub-head" data-aos="zoom-in">Last updated: {new Date().toLocaleString()}</p>
      {weather && <WeatherCard data={weather} />}
      {forecast.length > 0 && <ForecastCard forecast={forecast} />}
       <Footer />
    </div>
  );
}

export default App;