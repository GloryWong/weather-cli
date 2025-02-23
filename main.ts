
import { cacheWeatherData } from "./utils/cacheWeatherData.ts";
import { displayWeather } from "./utils/displayWeather.ts";
import { fetchLocationData } from "./utils/fetchLocationData.ts";
import { fetchWeatherData } from "./utils/fetchWeatherData.ts";
import { loadCachedWeatherData } from "./utils/loadCachedWeatherData.ts";

// Function to fetch weather data from Open-Meteo
async function getWeather(lat: number, lon: number) {
  try {
    const data = await fetchWeatherData(lat, lon);
    await cacheWeatherData(data); // Save data for offline use
    displayWeather(data);
  } catch (error: any) {
    console.error("⚠️ Network error! Loading cached weather data...");
    const cachedData = await loadCachedWeatherData();
    if (cachedData) {
      displayWeather(cachedData);
    } else {
      console.error("❌ No cached data available.");
    }
  }
}

const location = await fetchLocationData();
if (!location) {
  console.log("❌ Could not detect your location.");
  Deno.exit(1);
}

const weather = await fetchWeatherData(location.lat, location.lon);
displayWeather(weather)