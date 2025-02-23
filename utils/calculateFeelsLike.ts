export function calculateFeelsLike(temp: number, windSpeed: number, humidity: number): number {
  if (temp <= 10) {
    // Wind chill formula (only for cold weather)
    const windSpeedKmh = windSpeed * 3.6; // Convert m/s to km/h
    return (
      13.12 +
      0.6215 * temp -
      11.37 * Math.pow(windSpeedKmh, 0.16) +
      0.3965 * temp * Math.pow(windSpeedKmh, 0.16)
    );
  } else if (temp >= 27) {
    // Heat index formula (only for hot weather)
    return (
      -8.784 +
      1.611 * temp +
      2.338 * humidity -
      0.146 * temp * humidity -
      0.0123 * temp ** 2 -
      0.0164 * humidity ** 2 +
      0.00221 * temp ** 2 * humidity +
      0.000729 * temp * humidity ** 2 +
      0.0000148 * temp ** 2 * humidity ** 2
    );
  } else {
    return temp; // No adjustment needed for mild temperatures
  }
}