import { ArrowLeft, StarIcon } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function ShopCard({ id, name, categories, rating, reviews, image }) {
  return (
    <Link to={`/shop/${id}/${categories}`} >
      <Card className="bg-white shadow-lg rounded-lg p-4 transform hover:shadow-xl">
        <div className="flex gap-4">
          <Avatar className="w-10 h-10 border">
            <AvatarImage src={image} alt={`@${name}`} />
            <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
            <p className="text-sm text-gray-500">{categories}</p>
            <div className="flex items-center gap-2 mt-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <StarIcon
                  key={index}
                  className={`h-5 w-5 ${index < Math.floor(rating) ? "fill-yellow-500" : "text-muted-foreground"}`}
                />
              ))}
              <span className="text-sm font-medium text-gray-700">{rating}</span>
            </div>
            <p className="block text-sm text-gray-500">({reviews} reviews)</p>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <Button size="sm" className="w-full bg-primary text-white hover:bg-primary-dark transition-colors duration-200">
            View Shop
          </Button>
        </div>
      </Card>
    </Link>
  );
}
