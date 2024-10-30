import { ArrowLeft, StarIcon } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export function ShopCard({ id, name, categories, rating, reviews, image }) {
  return (
    <>
      <Card className="bg-white shadow-md rounded-lg p-4">
        <div className="flex items-center gap-4">
          <img
            src={image}
            alt={name}
            width={80}
            height={80}
            className="rounded-full"
            style={{ aspectRatio: "80/80", objectFit: "cover" }}
          />
          <div>
            <h3 className="text-lg font-bold">{name}</h3>
            <p className="text-sm text-muted-foreground">{categories.join(", ")}</p>
            <div className="flex items-center gap-2 mt-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <StarIcon
                  key={index}
                  className={`h-4 w-4 ${index < Math.floor(rating) ? "fill-yellow-500" : "text-muted-foreground"}`}
                />
              ))}
              <span className="text-sm font-medium">{rating}</span>
              <span className="text-sm text-muted-foreground">({reviews} reviews)</span>
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <Link to={`/shop/${id}`} >
            <Button size="sm" className="w-full">
            </Button>
          </Link>
        </div>
      </Card>
    </>
  );
}
