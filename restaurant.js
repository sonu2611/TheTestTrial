// Indian Restaurant Dataset Generator
function generateIndianRestaurants(count = 500) {
    const cities = [
        { name: "Mumbai", state: "Maharashtra", lat: 19.0760, lng: 72.8777 },
        { name: "Delhi", state: "Delhi", lat: 28.7041, lng: 77.1025 },
        { name: "Bangalore", state: "Karnataka", lat: 12.9716, lng: 77.5946 },
        { name: "Hyderabad", state: "Telangana", lat: 17.3850, lng: 78.4867 },
        { name: "Chennai", state: "Tamil Nadu", lat: 13.0827, lng: 80.2707 },
        { name: "Kolkata", state: "West Bengal", lat: 22.5726, lng: 88.3639 },
        { name: "Pune", state: "Maharashtra", lat: 18.5204, lng: 73.8567 },
        { name: "Jaipur", state: "Rajasthan", lat: 26.9124, lng: 75.7873 },
        { name: "Ahmedabad", state: "Gujarat", lat: 23.0225, lng: 72.5714 },
        { name: "Lucknow", state: "Uttar Pradesh", lat: 26.8467, lng: 80.9462 },
        { name: "Kanpur", state: "Uttar Pradesh", lat: 26.4499, lng: 80.3319 },
        { name: "Nagpur", state: "Maharashtra", lat: 21.1458, lng: 79.0882 },
        { name: "Indore", state: "Madhya Pradesh", lat: 22.7196, lng: 75.8577 },
        { name: "Thiruvananthapuram", state: "Kerala", lat: 8.5241, lng: 76.9366 },
        { name: "Bhopal", state: "Madhya Pradesh", lat: 23.2599, lng: 77.4126 },
        { name: "Visakhapatnam", state: "Andhra Pradesh", lat: 17.6868, lng: 83.2185 },
        { name: "Patna", state: "Bihar", lat: 25.5941, lng: 85.1376 },
        { name: "Vadodara", state: "Gujarat", lat: 22.3072, lng: 73.1812 },
        { name: "Coimbatore", state: "Tamil Nadu", lat: 11.0168, lng: 76.9558 },
        { name: "Agra", state: "Uttar Pradesh", lat: 27.1767, lng: 78.0081 }
    ];

    const dishCategories = {
        north: [
            { name: "Butter Chicken", price: [250, 350] },
            { name: "Dal Makhani", price: [180, 250] },
            { name: "Paneer Tikka", price: [200, 280] },
            { name: "Rogan Josh", price: [280, 380] },
            { name: "Chole Bhature", price: [120, 180] },
            { name: "Aloo Paratha", price: [80, 120] },
            { name: "Rajma Chawal", price: [100, 150] },
            { name: "Gulab Jamun", price: [60, 100] }
        ],
        south: [
            { name: "Masala Dosa", price: [80, 120] },
            { name: "Idli Sambar", price: [60, 90] },
            { name: "Vada", price: [40, 60] },
            { name: "Hyderabadi Biryani", price: [200, 300] },
            { name: "Fish Curry", price: [180, 250] },
            { name: "Appam with Stew", price: [120, 180] },
            { name: "Pongal", price: [70, 100] },
            { name: "Payasam", price: [80, 120] }
        ],
        east: [
            { name: "Macher Jhol", price: [220, 300] },
            { name: "Rosogolla", price: [50, 80] },
            { name: "Momo", price: [80, 120] },
            { name: "Thukpa", price: [120, 180] },
            { name: "Litti Chokha", price: [100, 150] },
            { name: "Sandesh", price: [60, 100] },
            { name: "Mishti Doi", price: [50, 80] }
        ],
        west: [
            { name: "Pav Bhaji", price: [100, 150] },
            { name: "Vada Pav", price: [30, 50] },
            { name: "Misal Pav", price: [80, 120] },
            { name: "Dhokla", price: [70, 100] },
            { name: "Thepla", price: [60, 90] },
            { name: "Khandvi", price: [80, 120] },
            { name: "Shrikhand", price: [70, 100] }
        ]
    };

    const restaurantNames = [
        "Spice Route", "Royal Darbar", "Taste of India", "Namaste", "Bharat Bhojanalay",
        "Swaad Anokha", "Ghar Ka Khana", "Rasoi", "Annapurna", "Swadistha",
        "Punjab Grill", "Dakshin", "Copper Chimney", "Oh! Calcutta", "Peshawri",
        "Kareem's", "Karavalli", "Tunday Kababi", "Paradise", "Saravana Bhavan",
        "Sagar Ratna", "Haldiram's", "Bikanervala", "Bademiya", "Cream Centre",
        "Rajdhani", "Maharaja Bhog", "Gujarat Bhojanalay", "Udupi Palace", "Andhra Bhavan"
    ];

    const restaurantTypes = [
        "Restaurant", "Dhaba", "Bhojanalay", "Family Restaurant", "Fine Dining",
        "Cafe", "Eatery", "Food Court", "Mess", "Udipi Hotel"
    ];

    const regions = {
        "Maharashtra": "west",
        "Delhi": "north",
        "Karnataka": "south",
        "Telangana": "south",
        "Tamil Nadu": "south",
        "West Bengal": "east",
        "Rajasthan": "north",
        "Gujarat": "west",
        "Uttar Pradesh": "north",
        "Madhya Pradesh": "north",
        "Kerala": "south",
        "Bihar": "east",
        "Andhra Pradesh": "south"
    };

    const restaurants = [];

    for (let i = 0; i < count; i++) {
        const city = cities[i % cities.length];
        const region = regions[city.state] || "north";
        const dishes = dishCategories[region];
        
        const menuItems = [];
        const numDishes = 3 + Math.floor(Math.random() * 3); // 3-5 dishes per restaurant
        
        for (let j = 0; j < numDishes; j++) {
            const dish = dishes[Math.floor(Math.random() * dishes.length)];
            const priceRange = dish.price;
            const price = priceRange[0] + Math.floor(Math.random() * (priceRange[1] - priceRange[0]));
            
            menuItems.push({
                name: dish.name,
                price: price
            });
        }

        const restaurantName = `${restaurantNames[Math.floor(Math.random() * restaurantNames.length)]} ${restaurantTypes[Math.floor(Math.random() * restaurantTypes.length)]}`;
        
        restaurants.push({
            id: i + 1,
            name: restaurantName,
            address: `${Math.floor(Math.random() * 100) + 1} ${['MG Road', 'Main Road', 'Church Street', 'Gandhi Road', 'Nehru Road'][Math.floor(Math.random() * 5)]}, ${city.name}, ${city.state}`,
            rating: (4.0 + Math.random() * 0.9).toFixed(1), // 4.0 to 4.9
            priceRange: 1 + Math.floor(Math.random() * 4), // 1-4
            location: {
                lat: city.lat + (Math.random() - 0.5) * 0.1,
                lng: city.lng + (Math.random() - 0.5) * 0.1
            },
            menu: menuItems
        });
    }

    return restaurants;
}

// Generate 500 Indian restaurants
const restaurants = generateIndianRestaurants(500);