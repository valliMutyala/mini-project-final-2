import { ArrowLeftIcon, Diameter, StarIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { ShopCard } from "../components/shopCard.js";
import { useEffect, useState } from "react";
import { Slider } from "../components/ui/slider.jsx";


export function Category() {
  const [shops, setShops] = useState([]);
  const demoData = [
    {
      "id": 1,
      "name": "Acme Shopping Mall",
      "categories": ["Clothing", "Accessories", "Electronics"],
      "rating": 4.8,
      "reviews": 120,
      "image": "/placeholder.svg"
    },
    {
      "id": 2,
      "name": "Bloom Boutique",
      "categories": ["Women's Fashion", "Accessories"],
      "rating": 4.6,
      "reviews": 85,
      "image": "/placeholder.svg"
    },
    {
      "id": 3,
      "name": "Tech Gadgets",
      "categories": ["Electronics", "Gadgets", "Accessories"],
      "rating": 4.4,
      "reviews": 72,
      "image": "/placeholder.svg"
    },
    {
      "id": 4,
      "name": "Furniture Emporium",
      "categories": ["Home Decor", "Furniture", "Lighting"],
      "rating": 4.7,
      "reviews": 92,
      "image": "/placeholder.svg"
    },
    {
      "id": 5,
      "name": "Apparel Outlet",
      "categories": ["Clothing", "Shoes", "Accessories"],
      "rating": 4.5,
      "reviews": 105,
      "image": "/placeholder.svg"
    },
    {
      "id": 6,
      "name": "Jewelry Boutique",
      "categories": ["Jewelry", "Watches", "Accessories"],
      "rating": 4.8,
      "reviews": 68,
      "image": "/placeholder.svg"
    }
  ]

  useEffect(() => {
    setShops(() => demoData)
  }, [])
  
  const [distance, setDistance] = useState([0, 10]);

  const handleDistanceChange = (value) => {
    setDistance(value);
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
                step={0.5} />

                <small className="text-gray-500">
                  Selected distance range: {distance[0]} km
                </small>
              </div>
              <div>
                <label htmlFor="rating" className="text-sm font-medium">
                  Rating
                </label>
                <div className="flex flex-col items-start gap-2 mt-2">
                  <button className="flex items-center gap-1 text-yellow-500 hover:underline">
                    <StarIcon className="h-4 w-4 fill-yellow-500" />
                    <StarIcon className="h-4 w-4 fill-yellow-500" />
                    <StarIcon className="h-4 w-4 fill-yellow-500" />
                    <StarIcon className="h-4 w-4 fill-yellow-500" />
                    <StarIcon className="h-4 w-4 fill-yellow-500" />
                    <span>5</span>
                  </button>
                  <button className="flex items-center gap-1 text-yellow-500 hover:underline">
                    <StarIcon className="h-4 w-4 fill-yellow-500" />
                    <StarIcon className="h-4 w-4 fill-yellow-500" />
                    <StarIcon className="h-4 w-4 fill-yellow-500" />
                    <StarIcon className="h-4 w-4 fill-yellow-500" />
                    <StarIcon className="h-4 w-4 text-muted-foreground" />
                    <span>4</span>
                  </button>
                  <button className="flex items-center gap-1 text-yellow-500 hover:underline">
                    <StarIcon className="h-4 w-4 fill-yellow-500" />
                    <StarIcon className="h-4 w-4 fill-yellow-500" />
                    <StarIcon className="h-4 w-4 fill-yellow-500" />
                    <StarIcon className="h-4 w-4 text-muted-foreground" />
                    <StarIcon className="h-4 w-4 text-muted-foreground" />
                    <span>3</span>
                  </button>
                  <button className="flex items-center gap-1 text-yellow-500 hover:underline">
                    <StarIcon className="h-4 w-4 fill-yellow-500" />
                    <StarIcon className="h-4 w-4 fill-yellow-500" />
                    <StarIcon className="h-4 w-4 text-muted-foreground" />
                    <StarIcon className="h-4 w-4 text-muted-foreground" />
                    <StarIcon className="h-4 w-4 text-muted-foreground" />
                    <span>2</span>
                  </button>
                  <button className="flex items-center gap-1 text-yellow-500 hover:underline">
                    <StarIcon className="h-4 w-4 fill-yellow-500" />
                    <StarIcon className="h-4 w-4 text-muted-foreground" />
                    <StarIcon className="h-4 w-4 text-muted-foreground" />
                    <StarIcon className="h-4 w-4 text-muted-foreground" />
                    <StarIcon className="h-4 w-4 text-muted-foreground" />
                    <span>1</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center mb-4">
              <Link to="/" className="flex items-center gap-2 hover:underline" >
                <ArrowLeftIcon className="h-5 w-5" />
                <span>Back</span>
              </Link>
              <h1 className="text-2xl font-bold ml-auto">Available</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {shops.map(shop => <ShopCard
                key={shop.id}
                id={shop.id}
                name={shop.name}
                categories={shop.categories}
                rating={shop.rating}
                reviews={shop.reviews}
                image={shop.image}
              />)}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}