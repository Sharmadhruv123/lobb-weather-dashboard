# 🌤️ Lobb Weather Dashboard

A polished, responsive Vue.js 3 weather application that provides real-time current conditions and a 5-day forecast. Built with a unique **"Sky & Instrument"** design philosophy — the UI reads like a precision weather gauge panel, featuring condition-driven sky gradients that cross-fade on each search.

This project was built as an assignment for Lobb, focusing on clean architecture, component reusability, and premium aesthetics.

## ✨ Features

- **Real-Time Weather Data:** Accurate current conditions (temperature, humidity, wind speed) powered by the Open-Meteo API.
- **5-Day Forecast:** Scrollable daily forecast with high/low temperatures and weather conditions.
- **Dynamic Sky Gradients:** The application's background smoothly transitions to reflect the current weather condition of the searched city (e.g., sunny, rainy, cloudy).
- **Responsive Design:** Fully optimized for both desktop and mobile devices.
- **Error Handling:** Graceful error states for invalid city names or network issues (try searching for `error` to see the UI).
- **No API Key Required:** Uses Open-Meteo's free geocoding and forecast APIs.

## 🛠️ Tech Stack

- **Framework:** Vue 3 (Composition API)
- **Tooling:** Vite (Dev Server & Build)
- **Styling:** Vanilla CSS with Custom Properties (No UI frameworks used)
- **Testing:** Vitest + Vue Test Utils

## 🚀 Setup & Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sharmadhruv123/lobb-weather-dashboard.git
   cd lobb-weather-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   Open the URL shown in your terminal (typically `http://localhost:5173`).

## 🧪 Testing

Run the test suite using Vitest:

```bash
npm run test
```

This runs:
- `tests/formatters.test.js` — pure unit tests for formatting helpers.
- `tests/CurrentWeather.test.js` — component tests covering loading, data fetching, and empty states.

## 📖 Usage Guide

1. Type a city name in the search bar (e.g., "London", "Tokyo") and press Enter or click the search icon.
2. View the hero panel showing the current temperature, weather condition, humidity, and wind speed.
3. Scroll through the 5-day forecast strip below.
4. Click the refresh icon to re-fetch the latest data for the current city without reloading the page.

## 🏗️ Project Structure

```
src/
  components/
    SearchBar.vue
    CurrentWeather.vue
    ForecastStrip.vue
    WeatherIcon.vue
    StateEmpty.vue / StateError.vue / StateLoading.vue
  composables/
    useWeather.js
  utils/
    formatters.js
    conditionTheme.js
    openMeteo.js
    weatherCode.js
  App.vue
  main.js
tests/
  formatters.test.js
  CurrentWeather.test.js
```

## 🎨 Design

See [DESIGN.md](./DESIGN.md) for the full design token system, typography pairings, layout wireframes, and details on the signature gradient cross-fade element.

## 📡 API Details

| Purpose | Provider / Endpoint |
|---|---|
| City geocoding | `https://geocoding-api.open-meteo.com/v1/search` |
| Current + 5-day forecast | `https://api.open-meteo.com/v1/forecast` |

*See `src/utils/openMeteo.js` for request parameters and response mapping.*
