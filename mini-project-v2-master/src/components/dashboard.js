import { BriefcaseIcon, CarIcon, HomeIcon, HospitalIcon, LuggageIcon, MenuIcon, SchoolIcon, SearchIcon, ShoppingBagIcon} from "lucide-react";
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
      id: 2,
      url: "data:image/jpeg;base64,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",
      alt: "Shop 2",
      shopName: "Book Haven",
      shopType: "Bookstore",
      rating: 4.8,
      reviews: ["Wide collection of books.", "Helpful staff.", "A book lover's paradise."]
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
              to="category/restaruants"
              className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center gap-2 hover:bg-accent hover:text-accent-foreground transition-colors"
            
            >
              <MenuIcon className="h-8 w-8" />
              <span className="text-sm font-medium">Restaurants</span>
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
              to="category/business"
              className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center gap-2 hover:bg-accent hover:text-accent-foreground transition-colors"
            
            >
              <BriefcaseIcon className="h-8 w-8" />
              <span className="text-sm font-medium">Business</span>
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