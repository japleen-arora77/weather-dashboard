export interface weatherData {
    city:string;
    temperature:number;
    desc:string;
    rainChance:number;
    uvIdx:number;
    humidity:number;
    windSpeed:number;
    icon:string;
}

export interface forecastDay {
        date: string;
        day: string; 
        temperature: number;      // avgtemp_c
        desc: string;             // weather description
        icon: string;             // icon URL
        sunrise: string;
        sunset: string;
        hour: {
          time: string;
          temp_c: number;
          time_epoch:number;
          chance_of_rain: number;
          condition: {
            text: string;
            icon: string;
        };
    }[];
}
