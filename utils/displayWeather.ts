import { formatLocalTime } from "./formatLocalTime.ts";
import { getClothingSuggestion } from "./getClothingSuggestion.ts";
import { getWindDirection } from "./getWindDirection.ts";
import weatherDescriptions from "../maps/weather_descriptions.json" with { type: "json" };
import weatherIcons from "../maps/weather_icons.json" with { type: "json" };
import { calculateFeelsLike } from "./calculateFeelsLike.ts";

export function displayWeather(data: WeatherResponse, location?: any) {
  const weatherCode = data.current.weather_code;
  const temp = data.current.temperature_2m;
  const windSpeed = data.current.wind_speed_10m;
  const humidity = data.current.relative_humidity_2m;
  const windDirection = getWindDirection(data.current.wind_direction_10m);
  const sunrise = formatLocalTime(data.daily.sunrise[0], data.timezone);
  const sunset = formatLocalTime(data.daily.sunset[0], data.timezone);

  const feelsLike = calculateFeelsLike(temp, windSpeed, humidity);
  const weatherText = weatherDescriptions[weatherCode] || { en: "Unknown", zh: "未知" };
  const clothingSuggestion = getClothingSuggestion(feelsLike, weatherCode);

  console.log(`${weatherIcons[weatherCode] || "❓"}  ${weatherText.en} / ${weatherText.zh}`);
  console.log(`🌍 Location: ${location ? location.city : `${data.latitude}, ${data.longitude}`} (${data.timezone_abbreviation}, ${data.timezone})`);
  console.log(`🌡️  Temperature: ${temp}°C (Feels like ${feelsLike.toFixed(1)}°C)`);
  console.log(`💦 Humidity: ${humidity}%`);
  console.log(`💨 Wind: ${windSpeed} m/s ${windDirection}`);
  console.log(`${clothingSuggestion}`);
  console.log(`🌅 Sunrise: ${sunrise}`);
  console.log(`🌇 Sunset: ${sunset}`);
}