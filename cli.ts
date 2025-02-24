import { fetchWeatherData } from "./utils/fetchWeatherData.ts";
import { fetchLocationData } from "./utils/fetchLocationData.ts";
import { displayWeather } from "./utils/displayWeather.ts";

// CLI Arguments
const args = Deno.args;

async function main() {
  if (args.includes("--help") || args.includes("-h")) {
    console.log(`
Usage: weather [options]

Options:
  --weather <lat> <lon>   Fetch weather data for given latitude & longitude
  --location              Fetch location data based on IP
  --force, -f             Skip cache and fetch new data
  --help, -h              Show this help message

Note: data is cached for 5 minutes. Use --force to skip cache.
`);
    return;
  }

  const force = args.includes('--force') || args.includes('-f')

  if (args.includes("--location")) {
    const location = await fetchLocationData(force);
    console.log("📍 Your Location:");
    console.log(`City: ${location.city}`);
    console.log(`Region: ${location.regionName}`);
    console.log(`Country: ${location.country}`);
    console.log(`Latitude: ${location.lat}, Longitude: ${location.lon}`);
    return;
  }

  if (args.includes("--weather")) {
    const index = args.indexOf("--weather");
    if (index === -1 || index + 2 >= args.length) {
      console.error("❌ Please provide latitude and longitude.");
      return;
    }

    const lat = parseFloat(args[index + 1]);
    const lon = parseFloat(args[index + 2]);

    if (isNaN(lat) || isNaN(lon)) {
      console.error("❌ Invalid latitude or longitude.");
      return;
    }

    const weather = await fetchWeatherData(lat, lon, force);
    displayWeather(weather)
    return;
  }

  const location = await fetchLocationData(force);
  if (!location) {
    console.log("❌ Could not detect your location.");
    Deno.exit(1);
  }
  
  const weather = await fetchWeatherData(location.lat, location.lon, force);
  displayWeather(weather, location)
}

await main();