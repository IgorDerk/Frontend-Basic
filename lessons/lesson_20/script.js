const geo = document.querySelector("#geo");

async function fetchGeo() {
  const res = await fetch("https://get.geojs.io/v1/ip/geo.json");
  const data = await res.json();

  const { city, latitude, longitude } = data;

  const secondRes = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
  );

  const secondData = await secondRes.json();

  const { temperature, windspeed, weathercode } = secondData.current_weather;
  const { temperature: temperatureUnit, windspeed: windspeedUnit } =
    secondData.current_weather_units;

  const weatherDescription = decodeWeatherCode(weathercode);

  geo.innerHTML = `
  <p><strong>City:</strong> ${city}</p>
  <p><strong>Temperature:</strong> ${temperature} ${temperatureUnit}</p>
  <p><strong>Wind Speed:</strong> ${windspeed} ${windspeedUnit}</p>
  <p><strong>Weather Code:</strong> ${weatherDescription}</p>
`;
}

function decodeWeatherCode(code) {
  switch (code) {
    case 0:
      return "Clear sky";
    case 1:
      return "Mainly clear";
    case 2:
      return "Partly cloudy";
    case 3:
      return "Overcast";
    case 45:
      return "Fog";
    case 48:
      return "Depositing rime fog";
    case 51:
      return "Drizzle: light";
    case 53:
      return "Drizzle: moderate";
    case 55:
      return "Drizzle: dense intensity";
    case 56:
      return "Freezing Drizzle: light";
    case 57:
      return "Freezing Drizzle: dense intensity";
    case 61:
      return "Rain: slight";
    case 63:
      return "Rain: moderate";
    case 65:
      return "Rain: heavy";
    case 66:
      return "Freezing Rain: light";
    case 67:
      return "Freezing Rain: heavy intensity";
    case 71:
      return "Snow fall: slight";
    case 73:
      return "Snow fall: moderate";
    case 75:
      return "Snow fall: heavy intensity";
    case 77:
      return "Snow grains";
    case 80:
      return "Rain showers: slight";
    case 81:
      return "Rain showers: moderate";
    case 82:
      return "Rain showers: violent";
    case 85:
        return "Snow showers: slight"
    case 86:
      return "Snow showers: heavy";
    case 95:
      return "Thunderstorm: Slight or moderate";
    case 96:
        return "Thunderstorm with slight"
    case 99:
      return "Thunderstorm heavy hail";
    default:
      return "Unknown weather condition";
  }
}

fetchGeo();
