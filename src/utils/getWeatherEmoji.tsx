// src/utils/getWeatherEmoji.ts

export default function getWeatherEmoji(desc: string, isDay: boolean): string {
    const lower = desc.toLowerCase();
  
    if (lower.includes("sunny") || lower.includes("clear")) {
      return isDay ? "☀️" : "🌙"; 
    } else if (lower.includes("partly cloudy")) {
      return isDay ? "🌤️" : "🌥️";
    } else if (lower.includes("cloudy") || lower.includes("overcast")) {
      return "☁️";
    } else if (lower.includes("mist") || lower.includes("fog") || lower.includes("haze")) {
      return "🌫️";
    } else if (lower.includes("rain") || lower.includes("shower") || lower.includes("drizzle")
    ) {
      return "🌧️";
    } else if (lower.includes("thunder") || lower.includes("storm")) {
      return "⛈️";
    } else if (lower.includes("snow") || lower.includes("blizzard") || lower.includes("sleet")
    ) {
      return "❄️";
    } else if (lower.includes("wind") || lower.includes("breeze") || lower.includes("gust")) {
      return "🌬️";
    } else if (lower.includes("ice") || lower.includes("frost")) {
      return "🧊";
    } else if (lower.includes("smoke") || lower.includes("dust") || lower.includes("sand")) {
      return "🌪️";
    } else {
      //unrecognized weather condition
      return isDay ? "🌈" : "🌌";
    }
  }
  