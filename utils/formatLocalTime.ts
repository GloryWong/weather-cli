export function formatLocalTime(utcString: string, timezone: string): string {
  const date = new Date(utcString) // Convert string to Date object

  return new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }).format(date)
}
