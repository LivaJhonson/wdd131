// wdd131/scripts/main.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Current Year for Footer
    const currentYearSpan = document.getElementById('currentyear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // 2. Last Modified Date for Footer
    const lastModifiedSpan = document.getElementById('lastmodified');
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = document.lastModified;
    }

    // 3. Wind Chill Calculation and Display
    // Static values for demonstration, more realistic for Ghana.
    // In a real application, these would come from a weather API.
    const temperatureCelsius = 28; // Example temperature for Ghana (e.g., Accra's average)
    const windSpeedKmh = 15;     // Example wind speed for Ghana (e.g., coastal breeze)

    // Update displayed temperature and wind speed (both metric and imperial)
    document.getElementById('temp').textContent = temperatureCelsius.toFixed(0);
    document.getElementById('temp-imperial').textContent = ((temperatureCelsius * 9/5) + 32).toFixed(0);

    document.getElementById('wind-speed').textContent = windSpeedKmh.toFixed(0);
    document.getElementById('wind-speed-imperial').textContent = (windSpeedKmh / 1.60934).toFixed(0);

    const windChillSpan = document.getElementById('wind-chill');

    /**
     * Calculates the wind chill factor using the provided formula.
     * Formula: 13.12 + 0.6215 * T - 11.37 * V^0.16 + 0.3965 * T * V^0.16
     * Where T is temperature in Celsius, V is wind speed in km/h.
     * Returns "N/A" if conditions for calculation are not met (T > 10°C or V <= 4.8 km/h).
     */
    function calculateWindChill(tempC, windKmh) {
        // Conditions for wind chill calculation (as per assignment):
        // Temperature (T) must be <= 10°C (50°F)
        // Wind speed (V) must be > 4.8 km/h (3 mph)
        if (tempC <= 10 && windKmh > 4.8) {
            const windChill = 13.12 + (0.6215 * tempC) - (11.37 * Math.pow(windKmh, 0.16)) + (0.3965 * tempC * Math.pow(windKmh, 0.16));
            // Return in Celsius, as the input temp is Celsius
            return windChill.toFixed(1) + '°C';
        } else {
            return "N/A";
        }
    }

    // Call the function and update the DOM
    windChillSpan.textContent = calculateWindChill(temperatureCelsius, windSpeedKmh);

    // Placeholder for weather conditions (e.g., from an API)
    // You could dynamically change the weather icon based on this too.
    document.getElementById('conditions').textContent = 'Warm and Sunny';
});