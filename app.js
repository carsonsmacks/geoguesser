let map;
let score = 0;
let correctLocation;
let userGuess;

// Initialize the map with Leaflet.js
function initMap() {
    // Set the initial map view (we'll start with a general world view)
    map = L.map('map').setView([0, 0], 2);

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Set a click event to allow users to guess locations
    map.on('click', function(e) {
        userGuess = e.latlng;
        calculateScore(userGuess, correctLocation);
    });

    // Load a new random location when the "New Location" button is clicked
    document.getElementById('new-location').addEventListener('click', loadNewLocation);
}

// Function to load a new random location
function loadNewLocation() {
    // Generate random latitude and longitude
    const randomLat = (Math.random() * 180) - 90;  // Latitude: -90 to 90
    const randomLng = (Math.random() * 360) - 180; // Longitude: -180 to 180

    correctLocation = L.latLng(randomLat, randomLng);

    // Set map view to the random location
    map.setView(correctLocation, 4);

    // Clear previous markers
    map.eachLayer(function(layer) {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });

    // Add a marker at the correct location
    L.marker(correctLocation).addTo(map).bindPopup("This is the correct location. Guess where it is!").openPopup();
}

// Function to calculate score based on user guess and correct location
function calculateScore(guess, correctLocation) {
    if (!correctLocation || !guess) return;

    // Calculate the distance between the guess and the correct location in meters
    const distance = guess.distanceTo(correctLocation);

    // Score: The closer the guess, the higher the score (max score of 100)
    let points = Math.max(0, 10000 - distance / 10); // Scale the distance

    score = Math.round(points);
    document.getElementById('score').textContent = score;
}

// Initialize the map when the page loads
window.onload = initMap;
