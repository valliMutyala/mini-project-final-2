import React, { useEffect, useState } from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const NominatimURL = "https://nominatim.openstreetmap.org/search?format=json&q=";

const markerIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Component to update map center
function RecenterAutomatically({ location }) {
  const map = useMap();
  useEffect(() => {
    if (location) {
      map.flyTo(location, 13, {
        animate: true,
      });
    }
  }, [location, map]);

  return null;
}

export function RegisterShop() {
  const [services, setServices] = useState([{ service: "", price: "" }]);
  const [openingTime, setOpeningTime] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const [shopType, setShopType] = useState("");
  const [location, setLocation] = useState(null);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleAddService = () => {
    setServices([...services, { service: "", price: "" }]);
  };

  const handleRemoveService = (index) => {
    const updatedServices = [...services];
    updatedServices.splice(index, 1);
    setServices(updatedServices);
  };

  const handleServiceChange = (index, field, value) => {
    const updatedServices = [...services];
    updatedServices[index][field] = value;
    setServices(updatedServices);
  };

  const handleOpeningTimeChange = (e) => {
    setOpeningTime(e.target.value);
  };

  const handleClosingTimeChange = (e) => {
    setClosingTime(e.target.value);
  };

  const handleShopTypeChange = (e) => {
    setShopType(e);
  };

  // Fetch user's current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation(() => [position.coords.latitude, position.coords.longitude]);
    });
  }, []);

  // Fetch autocomplete suggestions from Nominatim API
  const handleLocationChange = async (e) => {
    setQuery(e.target.value);
    if (e.target.value.length > 2) {
      const response = await fetch(`${NominatimURL}${e.target.value}`);
      const results = await response.json();
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const { lat, lon } = suggestion;
    setLocation([parseFloat(lat), parseFloat(lon)]);
    setSuggestions([]);
    setQuery(suggestion.display_name);
  };

  return (
    <main className="flex-1 bg-muted/10 py-8 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h1 className="text-2xl font-bold mb-4">Shop Registration</h1>
          <form onSubmit={(e) => e.preventDefault()} className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="shop-name">Shop Name</Label>
              <Input id="shop-name" type="text" placeholder="Enter shop name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                type="text"
                value={query}
                onChange={handleLocationChange}
                placeholder="Search for location"
              />
              {/* Autocomplete suggestions */}
              {suggestions.length > 0 && (
                <ul className="border bg-white z-10 max-h-60 overflow-y-auto">
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

              {/* Leaflet Map */}
              <div className="map-container h-[300px] mt-4">
                {location ? (
                  <MapContainer center={location} zoom={13} scrollWheelZoom={false}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={location} icon={markerIcon} />
                    {/* Automatically recenter map when location changes */}
                    <RecenterAutomatically location={location} />
                  </MapContainer>
                ) : (
                  <h2>Loading Maps...</h2>
                )}
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="shop-type">Shop Type</Label>
                <Select id="shop-type" value={shopType} onValueChange={handleShopTypeChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select shop type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="restaurant">Restaurant</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="service">Service</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="photos">Shop Photos</Label>
                <Input id="photos" type="file" multiple />
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input id="mobile" type="tel" placeholder="Enter shop mobile number" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter shop email" />
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="opening-time">Opening Time</Label>
                <Input id="opening-time" type="time" value={openingTime} onChange={handleOpeningTimeChange} />
                <div className="text-sm text-muted-foreground">
                  {new Date(`2000-01-01T${openingTime}:00`).toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="closing-time">Closing Time</Label>
                <Input id="closing-time" type="time" value={closingTime} onChange={handleClosingTimeChange} />
                <div className="text-sm text-muted-foreground">
                  {new Date(`2000-01-01T${closingTime}:00`).toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                </div>
              </div>
            </div>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="services-and-prices">Services and Prices</Label>
                <div className="grid gap-4">
                  {services.map((service, index) => (
                    <div key={index} className="flex flex-col gap-4 md:flex-row md:items-center">
                      <Input
                        id={`service-${index}`}
                        type="text"
                        placeholder="Service"
                        value={service.service}
                        onChange={(e) => handleServiceChange(index, "service", e.target.value)}
                      />
                      <Input
                        id={`price-${index}`}
                        type="text"
                        placeholder="Price"
                        value={service.price}
                        onChange={(e) => handleServiceChange(index, "price", e.target.value)}
                      />
                      {index === services.length - 1 ? (
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full"
                          onClick={handleAddService}
                        >
                          <PlusIcon className="h-4 w-4" />
                          <span className="sr-only">Add Service</span>
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full text-red-500"
                          onClick={() => handleRemoveService(index)}
                        >
                          <MinusIcon className="h-4 w-4" />
                          <span className="sr-only">Remove Service</span>
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Button type="submit" className="w-full mt-4">
              Register Shop
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
