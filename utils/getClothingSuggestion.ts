export function getClothingSuggestion(temp: number, weatherCode: number): string {
  let suggestion = "";

  // Temperature-based suggestions
  if (temp < 0) {
    suggestion = "❄️ Wear a thick coat, gloves, and a hat! / 穿厚外套、手套和帽子！";
  } else if (temp < 5) {
    suggestion = "🥶 Bundle up with a winter jacket and scarf! / 穿冬季外套和围巾！";
  } else if (temp < 15) {
    suggestion = "🧥 A jacket or sweater is recommended! / 建议穿夹克或毛衣！";
  } else if (temp < 25) {
    suggestion = "👕 A T-shirt and jeans are comfortable! / T 恤和牛仔裤很舒适！";
  } else {
    suggestion = "🔥 Wear light clothing and stay hydrated! / 穿轻便衣物并保持水分！";
  }

  // Weather condition-based suggestions
  if ([51, 53, 55, 61, 63, 65].includes(weatherCode)) {
    suggestion += " ☔ Bring an umbrella, it's rainy! / 带伞，天在下雨！";
  }

  if ([71, 73, 75].includes(weatherCode)) {
    suggestion += " ⛄ Wear warm boots, it's snowy! / 穿暖靴，天在下雪！";
  }

  if (weatherCode === 95) {
    suggestion += " ⚠️ Stay indoors if possible, thunderstorms expected! / 尽量呆在室内，预计有雷暴！";
  }

  return suggestion;
}