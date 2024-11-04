import { Brush, CarIcon, HomeIcon, HospitalIcon, LuggageIcon, Utensils, SchoolIcon, SearchIcon, ShoppingBagIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Link, redirect } from "react-router-dom";
import ThumbCard from "./thumbCard";
import { useState, useEffect } from "react";
import { ShopCard } from "./shopCard";

const NominatimURL = "https://nominatim.openstreetmap.org/search?format=json&q=";

const demoData = [
  {
    "_id":  "67277eac88095203a8262ea7",
    "shopname": "Sangeetha ",
    "location": "Tanuku, West Godavari, Andhra Pradesh, India",
    "shoptype": "food",
    "mobilenumber": "12354865648",
    "email": "gmadhan781@gmail.com",
    "opentime": "03:15",
    "closetime": "22:15",
    "userEmail": "valli2@gmail.com",
    "images": [
      "http://localhost:3001/uploads/ANck4zIFZbxQgAAAABJRU5ErkJggg==",
      "data:image/png;base64,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"
    ],
    "services": [
      {
        "service": "Chicken Biryani",
        "price": 250,
      },
      {
        "service": "Biryani",
        "price": 8978,
      },
      {
        "service": "asdf",
        "price": 234,
      }
    ],
    "averageRating": 0,
    "rating": []
  },
  {
    "_id":  "6727a4ef69a8600a1e825b61",
    "shopname": "gamers",
    "location": "Tanuku, West Godavari, Andhra Pradesh, India",
    "shoptype": "food",
    "mobilenumber": "12354865648",
    "email": "gmadhan781@gmail.com",
    "opentime": "00:59",
    "closetime": "02:59",
    "userEmail": "valli2@gmail.com",
    "about": "Some thing about the shop",
    "images": [
      "http://localhost:3001/uploads/2024-11-03T16-29-35.165Z-istockphoto-959584318-612x612.jpg",
      "http://localhost:3001/uploads/2024-11-03T16-29-35.185Z-istockphoto-1081422898-612x612.jpg",
      "http://localhost:3001/uploads/2024-11-03T16-29-35.421Z-pexels-photo-262978.jpeg",
      "http://localhost:3001/uploads/2024-11-03T16-29-35.499Z-photo-1517248135467-4c7edcad34c4.jpeg"
    ],
    "services": [
      {
        "service": "grooming",
        "price": 4500,
      },
      {
        "service": "gAMING",
        "price": 234,
      }
    ],
    "rating": [
      5,
      5,
      4,
      5,
      1,
      5,
      1
    ],
    "averageRating": 3.7142857142857144
  },
  {
    "_id": "67284be74aebba81b48c43a6",
    "shopname": "vasavi foods",
    "location": "Pedatadepalli, Tadepalligudem, West Godavari, Andhra Pradesh, 534100, India",
    "shoptype": "food",
    "mobilenumber": "1234567890",
    "email": "chandana@gmail.com",
    "opentime": "10:51",
    "closetime": "20:52",
    "userEmail": "chandana@gmail.com",
    "about": "quality and quantity is our speciality",
    "images": [
      "C:\\Users\\Bharath\\Desktop\\mini-project-final-2\\server\\uploads\\2024-11-04T04-21-59.586Z-Screenshot 2024-09-29 110125.png"
    ],
    "rating": [
      3,
      2
    ],
    "averageRating": 2.5,
    "services": [
      {
        "service": "meal",
        "price": 50,
      },
      {
        "service": "drinks",
        "price": 50,
      },
      {
        "service": "snacks",
        "price": 70,
      }
    ],
  }
];

export default function Dashboard({setLocation, location}) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    if (query.length > 2) {
      const debounceFetch = setTimeout(async () => {
        try {
          const response = await fetch(`${NominatimURL}${query}`);
          const results = await response.json();
          setSuggestions(results);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        }
      }, 400); 

      return () => clearTimeout(debounceFetch);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleLocationChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    const { lat, lon } = suggestion;
    setSelectedLocation([parseFloat(lat), parseFloat(lon)]);
    setQuery(suggestion.display_name);
    setSuggestions([]);
  };

  function searhcHandler() {
    let location = document.querySelector('.searchLocation').value;
    if (location) {
      setLocation(location);
    }
  }

  return (
    <>
      <main className="flex-1 bg-muted/10 py-8 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h1 className="text-2xl font-bold mb-4">Find the best services</h1>
            <div className="flex items-center gap-4 relative">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={`${location || "search for location..."}` }
                  className="pl-10 pr-4 py-2 rounded-md w-full searchLocation"
                  value={query}
                  onChange={handleLocationChange}
                />
                {suggestions.length > 0 && (
                  <ul className="absolute left-0 right-0 mt-2 border bg-white z-10 max-h-60 overflow-y-auto">
                    {suggestions.map((suggestion) => (
                      <li
                        key={suggestion.place_id}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="p-2 cursor-pointer hover:bg-gray-200"
                      >
                        {suggestion.display_name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <Button className="shrink-0" onClick={searhcHandler}>set</Button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              to="category/food"
              className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center gap-2 hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <Utensils className="h-8 w-8" />
              <span className="text-sm font-medium">Food</span>
            </Link>
            <Link
              to="category/shopping"
              className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center gap-2 hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <ShoppingBagIcon className="h-8 w-8" />
              <span className="text-sm font-medium">Shopping</span>
            </Link>
            <Link
              to="category/automotive"
              className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center gap-2 hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <CarIcon className="h-8 w-8" />
              <span className="text-sm font-medium">Automotive</span>
            </Link>
            <Link
              to="category/healthcare"
              className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center gap-2 hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <HospitalIcon className="h-8 w-8" />
              <span className="text-sm font-medium">Healthcare</span>
            </Link>
            <Link
              to="category/home-services"
              className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center gap-2 hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <HomeIcon className="h-8 w-8" />
              <span className="text-sm font-medium">Home Services</span>
            </Link>
            <Link
              to="category/beauty-skincare"
              className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center gap-2 hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <Brush className="h-8 w-8" />
              <span className="text-sm font-medium">Beauty & Skincare</span>
            </Link>
            <Link
              to="category/education"
              className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center gap-2 hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <SchoolIcon className="h-8 w-8" />
              <span className="text-sm font-medium">Education</span>
            </Link>
            <Link
              to="category/travel"
              className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center gap-2 hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <LuggageIcon className="h-8 w-8" />
              <span className="text-sm font-medium">Travel</span>
            </Link>
          </div>

          {/* Search results */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Search Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {demoData.map((shop, index) => (
                <ShopCard
                  key={index}
                  id={shop._id}
                  name={shop.shopname}
                  categories={shop.shoptype}
                  rating={shop.averageRating.toFixed(1)|| 0}
                  reviews={shop.rating.length || 0}
                  image={shop.image}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
