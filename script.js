// script.js - Complete merged version with search suggestions

// Global variables
let map;
let markers = [];
let allDishes = [];
let currentSuggestions = [];
let highlightedIndex = -1;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeDishNames();
    setupEventListeners();
    
    // Check if Google Maps API is already loaded
    if (window.google && window.google.maps) {
        initMap();
    } else {
        // Fallback in case API hasn't loaded yet
        window.initMap = initMap;
    }
});

// Initialize map
function initMap() {
    try {
        map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: 20.5937, lng: 78.9629 }, // Center of India
            zoom: 5,
            gestureHandling: "cooperative"
        });
        console.log("Google Maps initialized successfully");
    } catch (error) {
        console.error("Error initializing Google Maps:", error);
        document.getElementById("map").innerHTML = 
            '<div class="map-error">Error loading map. Please try again later.</div>';
    }
}

// Set up all event listeners
function setupEventListeners() {
    const dishInput = document.getElementById('dishInput');
    const searchBtn = document.getElementById('searchBtn');
    
    // Search functionality
    searchBtn.addEventListener('click', searchDishes);
    dishInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchDishes();
        }
    });
    
    // Search suggestions
    dishInput.addEventListener('input', function() {
        showSuggestions(this.value);
    });
    
    dishInput.addEventListener('focus', function() {
        showSuggestions(this.value);
    });
    
    // Close suggestions when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.search-container')) {
            document.getElementById('suggestionsContainer').style.display = 'none';
        }
    });
    
    // Keyboard navigation for suggestions
    document.addEventListener('keydown', handleKeyDown);
}

// Extract all unique dish names from restaurant data
function initializeDishNames() {
    const dishSet = new Set();
    
    restaurants.forEach(restaurant => {
        restaurant.menu.forEach(item => {
            dishSet.add(item.name.toLowerCase());
        });
    });
    
    allDishes = Array.from(dishSet);
}

// Show search suggestions based on input
function showSuggestions(input) {
    const suggestionsContainer = document.getElementById('suggestionsContainer');
    suggestionsContainer.innerHTML = '';
    
    if (!input) {
        suggestionsContainer.style.display = 'none';
        return;
    }
    
    currentSuggestions = allDishes.filter(dish => 
        dish.includes(input.toLowerCase())
    ).slice(0, 8); // Show max 8 suggestions
    
    if (currentSuggestions.length === 0) {
        suggestionsContainer.style.display = 'none';
        return;
    }
    
    currentSuggestions.forEach((suggestion, index) => {
        const suggestionElement = document.createElement('div');
        suggestionElement.className = 'suggestion-item';
        suggestionElement.textContent = suggestion;
        
        suggestionElement.addEventListener('click', () => {
            document.getElementById('dishInput').value = suggestion;
            searchDishes();
            suggestionsContainer.style.display = 'none';
        });
        
        suggestionsContainer.appendChild(suggestionElement);
    });
    
    suggestionsContainer.style.display = 'block';
    highlightedIndex = -1;
}

// Handle keyboard navigation for suggestions
function handleKeyDown(e) {
    const suggestionsContainer = document.getElementById('suggestionsContainer');
    if (!suggestionsContainer || suggestionsContainer.style.display === 'none') return;
    
    const suggestionItems = document.querySelectorAll('.suggestion-item');
    
    switch (e.key) {
        case 'ArrowDown':
            e.preventDefault();
            if (highlightedIndex < suggestionItems.length - 1) {
                highlightedIndex++;
                updateHighlightedSuggestion(suggestionItems);
            }
            break;
        case 'ArrowUp':
            e.preventDefault();
            if (highlightedIndex > 0) {
                highlightedIndex--;
                updateHighlightedSuggestion(suggestionItems);
            }
            break;
        case 'Enter':
            if (highlightedIndex >= 0) {
                e.preventDefault();
                document.getElementById('dishInput').value = currentSuggestions[highlightedIndex];
                searchDishes();
                suggestionsContainer.style.display = 'none';
            }
            break;
        case 'Escape':
            suggestionsContainer.style.display = 'none';
            break;
    }
}

// Update highlighted suggestion in dropdown
function updateHighlightedSuggestion(suggestionItems) {
    suggestionItems.forEach((item, index) => {
        item.classList.toggle('highlighted', index === highlightedIndex);
    });
}

// Main search function
function searchDishes() {
    const dishInput = document.getElementById('dishInput').value.trim().toLowerCase();
    const resultsContainer = document.getElementById('restaurantsResults');
    const suggestionsContainer = document.getElementById('suggestionsContainer');
    
    // Hide suggestions when searching
    suggestionsContainer.style.display = 'none';
    
    if (!dishInput) {
        alert('Please enter a dish name');
        return;
    }

    // Clear previous results
    resultsContainer.innerHTML = '';
    clearMarkers();

    // Find restaurants that serve the dish
    const matchingRestaurants = restaurants.filter(restaurant => 
        restaurant.menu.some(item => item.name.toLowerCase().includes(dishInput))
    ).sort((a, b) => b.rating - a.rating); // Sort by rating

    if (matchingRestaurants.length === 0) {
        resultsContainer.innerHTML = '<p>No restaurants found serving this dish.</p>';
        return;
    }

    // Display results
    // In your searchDishes function, replace the restaurant card creation with:
matchingRestaurants.forEach(restaurant => {
    const restaurantCard = document.createElement('div');
    restaurantCard.className = 'restaurant-card';
    
    // Make entire card clickable
    restaurantCard.style.cursor = 'pointer';
    restaurantCard.addEventListener('click', () => {
        zoomToRestaurant(restaurant);
    });
    
    // Find the matching dishes
    const matchingDishes = restaurant.menu.filter(item => 
        item.name.toLowerCase().includes(dishInput));
    
    restaurantCard.innerHTML = `
        <h3>${restaurant.name}</h3>
        <p>${restaurant.address}</p>
        <p>Rating: ${restaurant.rating} ★</p>
        <p>Price Range: ${'$'.repeat(restaurant.priceRange)}</p>
        <div class="dishes-container">
            <p>Serving:</p>
            ${matchingDishes.map(dish => `<span class="dish-item">${dish.name} (₹${dish.price})</span>`).join('')}
        </div>
    `;
    
    resultsContainer.appendChild(restaurantCard);
    addMarker(restaurant);
});;

    // Adjust map to show all markers
    if (matchingRestaurants.length > 0) {
        const bounds = new google.maps.LatLngBounds();
        matchingRestaurants.forEach(restaurant => {
            bounds.extend(new google.maps.LatLng(restaurant.location.lat, restaurant.location.lng));
        });
        map.fitBounds(bounds);
    }
}

function zoomToRestaurant(restaurant) {
    map.setCenter({
        lat: restaurant.location.lat,
        lng: restaurant.location.lng
    });
    map.setZoom(16); // Higher zoom level for closer view
    
    // Optional: Highlight the marker
    markers.forEach(marker => {
        if (marker.getPosition().lat() === restaurant.location.lat && 
            marker.getPosition().lng() === restaurant.location.lng) {
            // Customize the marker appearance here
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(() => {
                marker.setAnimation(null);
            }, 1500);
        }
    });
}

// Add marker to map for a restaurant
function addMarker(restaurant) {
    const marker = new google.maps.Marker({
        position: { lat: restaurant.location.lat, lng: restaurant.location.lng },
        map: map,
        title: restaurant.name
    });
    
    const infoWindow = new google.maps.InfoWindow({
        content: `
            <div>
                <h3>${restaurant.name}</h3>
                <p>${restaurant.address}</p>
                <p>Rating: ${restaurant.rating} ★</p>
            </div>
        `
    });
    
    marker.addListener('click', () => {
        infoWindow.open(map, marker);
    });
    
    markers.push(marker);
}

// Clear all markers from map
function clearMarkers() {
    markers.forEach(marker => marker.setMap(null));
    markers = [];
}