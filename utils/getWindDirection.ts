import windDirections from "../maps/wind_directions.json" with { type: "json" };

export function getWindDirection(deg: number): string {
  return windDirections[Math.round(deg / 45) % 8];
}