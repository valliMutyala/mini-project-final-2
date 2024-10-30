import {   Brush,CarIcon, HomeIcon, HospitalIcon, LuggageIcon, Utensils, SchoolIcon, SearchIcon, ShoppingBagIcon} from "lucide-react";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import ThumbCard from "./thumbCard";

const demoData = [
  {
      id: 1,
      url: "https://www.posist.com/restaurant-times/wp-content/uploads/2023/07/How-To-Start-A-Coffee-Shop-Business-A-Complete-Guide.jpg",
      alt: "Shop 1",
      shopName: "The Coffee House",
      shopType: "Cafe",
      rating: 4.5,
      reviews: ["Great coffee!", "Cozy place.", "Loved the ambiance."]
  },
  {
      id: 3,
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Restaurant_N%C3%A4sinneula.jpg/800px-Restaurant_N%C3%A4sinneula.jpg",
      alt: "Shop 3",
      shopName: "Gourmet Delight",
      shopType: "Restaurant",
      rating: 4.3,
      reviews: ["Delicious food!", "Excellent service.", "Will visit again."]
  },
  {
      id: 4,
      url: "https://cdn-magazine.nutrabay.com/wp-content/uploads/2023/02/strong-bodybuilder-doing-heavy-weight-exercise-back-machine-1.jpg",
      alt: "Shop 4",
      shopName: "Fitness First",
      shopType: "Gym",
      rating: 4.7,
      reviews: ["Clean and spacious.", "Great trainers.", "Modern equipment."]
  },
  {
      id: 5,
      url: "https://img.etimg.com/thumb/width-1200,height-1200,imgsize-65126,resizemode-75,msid-91821769/tech/technology/tech-campuses-play-the-5g-tone-in-indigenisation-drive.jpg",
      alt: "Shop 5",
      shopName: "Tech World",
      shopType: "Electronics Store",
      rating: 4.6,
      reviews: ["Wide range of gadgets.", "Competitive prices.", "Knowledgeable staff."]
  },
  {
      id: 6,
      url: "https://static1.straitstimes.com.sg/s3fs-public/styles/large30x20/public/articles/2020/11/20/ak_flr_2011.jpg?VersionId=RhCgSLpoiKah5.d962UEAGs0_yzQ5FFB",
      alt: "Shop 6",
      shopName: "Floral Fantasy",
      shopType: "Florist",
      rating: 4.9,
      reviews: ["Beautiful flowers.", "Creative arrangements.", "Excellent service."]
  }
];



export default function Dashboard() {
    return(
        <>
        <main className="flex-1 bg-muted/10 py-8 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h1 className="text-2xl font-bold mb-4">Find the best services</h1>
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for services, products, and more..."
                  className="pl-10 pr-4 py-2 rounded-md w-full"
                />
              </div>
              <Button className="shrink-0">Search</Button>
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
              to="category/Shopping"
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
              < Brush  className="h-8 w-8" />
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
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Search Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
             {demoData.map(shop => (
              <Link to= {`/shop/${shop.id}`} key={shop.id}>
                <ThumbCard props={shop}/>
              </Link>
             ))}
            </div>
          </div>
        </div>
      </main>
    </>
    )
}
