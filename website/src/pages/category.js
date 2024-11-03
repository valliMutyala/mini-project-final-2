import { ArrowLeftIcon, Diameter, StarIcon } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { ShopCard } from "../components/shopCard.js";
import { useContext, useState } from "react";
import { Slider } from "../components/ui/slider.jsx";
import { ShopsContext } from "../context/shopsContext.js";

export function Category() {
  const category = useParams().id;
  const { shops } = useContext(ShopsContext);
  const [distance, setDistance] = useState([0, 10]);
  const [selectedRating, setSelectedRating] = useState(0); // State for selected rating

  const handleDistanceChange = (value) => {
    setDistance(value);
  };

  const handleRatingSelect = (rating) => {
    setSelectedRating(rating); // Update selected rating
  };

  const clearFilters = () => {
    setDistance([0, 10]); // Reset distance to default
    setSelectedRating(0);  // Reset selected rating
  };

  return (
    <>
      <main className="flex-1 bg-muted/10 py-8 px-4 md:px-6">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg font-bold mb-4">Filters</h2>
            <div className="grid gap-4">
              <div className="space-y-4">
                <Slider 
                  defaultValue={[0.5]} 
                  max={10} 
                  range
                  onValueChange={handleDistanceChange}
                  step={0.5} 
                />
                <small className="text-gray-500">
                  Selected distance range: {distance[0]} km
                </small>
              </div>
              <div>
                <label htmlFor="rating" className="text-sm font-medium">
                  Rating
                </label>
                <div className="flex flex-col items-start gap-2 mt-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <button
                      key={rating}
                      className="flex items-center gap-1 text-yellow-500 hover:underline"
                      onClick={() => handleRatingSelect(rating)} // Update the selected rating on click
                    >
                      {Array.from({ length: 5 }, (_, index) => (
                        <StarIcon 
                          key={index} 
                          className={`h-4 w-4 ${index < rating ? "fill-yellow-500" : "text-muted-foreground"}`} 
                        />
                      ))}
                      <span>{rating}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button 
              onClick={clearFilters} 
              className="mt-4 w-full bg-primary text-white py-2 rounded-md"
            >
              Clear Filters
            </button>
          </div>
          <div>
            <div className="flex items-center mb-4">
              <Link to="/" className="flex items-center gap-2 hover:underline">
                <ArrowLeftIcon className="h-5 w-5" />
                <span>Back</span>
              </Link>
              <h1 className="text-2xl font-bold ml-auto">Available</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {shops.filter(shop => 
                shop.shoptype === category && 
                (selectedRating === 0 || shop.averageRating >= selectedRating) // Filter by rating
              ).map((shop, index) => (
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

              {shops.filter(shop => 
                shop.shoptype === category && 
                (selectedRating === 0 || shop.averageRating >= selectedRating)
              ).length === 0 && (
                <div className="col-span-full text-center text-gray-500">
                  <Diameter className="h-16 w-16 mx-auto" />
                  <p className="text-lg font-bold">No shops found</p>
                  <p className="text-sm">Try adjusting your filters</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
