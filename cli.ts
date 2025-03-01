import { fetchWeatherData } from './utils/fetchWeatherData.ts'
import { fetchLocationData } from './utils/fetchLocationData.ts'
import { displayWeather } from './utils/displayWeather.ts'
import { parseArgs } from '@std/cli'

async function main() {
  const args = parseArgs(Deno.args, {
    boolean: ['location', 'force', 'help'],
    alias: {
      'force': 'f',
      'help': 'h'
    }
  })

  if (args['help']) {
    console.log(`
Usage: weather [options]

Fetch weather based on IP

Options:
  --location                Fetch location data based on IP
  --force, -f               Skip cache and fetch new data
  --help, -h                Show this help message

Note: data is cached for 5 minutes. Use --force to skip cache.
`)
    return
  }

  const force = args['force']

  if (args['location']) {
    const location = await fetchLocationData(force)
    console.log('📍 Your Location:')
    console.log(`City: ${location.city}`)
    console.log(`Region: ${location.regionName}`)
    console.log(`Country: ${location.country}`)
    console.log(`Latitude: ${location.lat}, Longitude: ${location.lon}`)
    return
  }

  const location = await fetchLocationData(force)
  if (!location) {
    console.log('❌ Could not detect your location.')
    Deno.exit(1)
  }

  const weather = await fetchWeatherData(location.lat, location.lon, force)
  displayWeather(weather, location)
}

await main()
