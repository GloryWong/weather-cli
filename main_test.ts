import { assertEquals, assert } from "@std/assert";
import { fetchWeatherData } from "./utils/fetchWeatherData.ts";
import { calculateFeelsLike } from "./utils/calculateFeelsLike.ts";
import { getWindDirection } from "./utils/getWindDirection.ts";

// Test Wind Chill Calculation (Cold Weather)
Deno.test("calculateFeelsLike - Wind Chill (Cold)", () => {
  const result = calculateFeelsLike(-5, 10, 50); // -5°C, 10 m/s wind, 50% humidity
  assert(result < -5, "Feels-like temp should be lower due to wind chill");
});

// Test Heat Index Calculation (Hot Weather)
Deno.test("calculateFeelsLike - Heat Index (Hot)", () => {
  const result = calculateFeelsLike(35, 2, 80); // 35°C, 2 m/s wind, 80% humidity
  assert(result > 35, "Feels-like temp should be higher due to humidity");
});

// Test Wind Direction Conversion
Deno.test("getWindDirection - Converts Degrees to Cardinal Direction", () => {
  assertEquals(getWindDirection(0), "⬆️ N");   // North
  assertEquals(getWindDirection(90), "➡️ E");  // East
  assertEquals(getWindDirection(180), "⬇️ S"); // South
  assertEquals(getWindDirection(270), "⬅️ W"); // West
});

// Mock API Response Handling
Deno.test("fetchWeatherData - Mocks API Response", async () => {
  globalThis.fetch = () =>
    new Response(
      JSON.stringify({
        current: {
          temperature_2m: 22,
          weather_code: 1,
          wind_speed_10m: 5,
          wind_direction_10m: 180,
          relative_humidity_2m: 60,
        },
        daily: {
          sunrise: ["2024-06-08T05:30:00Z"],
          sunset: ["2024-06-08T20:00:00Z"],
        },
      }),
      { status: 200 }
    ) as any;

  const response = await fetchWeatherData(40.7128, -74.0060);
  assertEquals(response.current.temperature_2m, 22);
  assertEquals(response.current.weather_code, 1);
  assertEquals(response.current.wind_speed_10m, 5);
  assertEquals(response.current.wind_direction_10m, 180);
  assertEquals(response.current.relative_humidity_2m, 60);
  assertEquals(response.daily.sunrise[0], "2024-06-08T05:30:00Z");
  assertEquals(response.daily.sunset[0], "2024-06-08T20:00:00Z");
});

// // Mock network failure
// Deno.test("fetchWeatherData - Handles network failure", async () => {
//   globalThis.fetch = async () => {
//     throw new Error("Network Error");
//   };

//   await assertRejects(
//     async () => await fetchWeatherData(40.7128, -74.0060),
//     Error,
//     "Failed to fetch weather data: Network Error"
//   );
// });

// // Mock non-200 API response
// Deno.test("fetchWeatherData - Handles API error (500)", async () => {
//   globalThis.fetch = () =>
//     new Response("Internal Server Error", { status: 500, statusText: "Internal Server Error" }) as any;

//   await assertRejects(
//     async () => await fetchWeatherData(40.7128, -74.0060),
//     Error,
//     "API error: 500 Internal Server Error"
//   );
// });
