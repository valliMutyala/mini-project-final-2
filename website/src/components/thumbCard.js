import React from "react";
import { Card } from "./ui/card";
import { StarIcon } from "lucide-react";
import { Button } from "./ui/button";

export default function ThumbCard({props:shop}) {
    const {url,alt,shopName,shopType,rating, reviews} = shop;
    return (
        <Card className="bg-white shadow-md rounded-lg p-4">
            <div className="flex items-center gap-4">
                <img
                    src={url}
                    alt={alt}
                    width={80}
                    height={80}
                    className="rounded-full"
                    style={{ aspectRatio: "80/80", objectFit: "cover" }}
                />
                <div>
                    <h3 className="text-lg font-bold">{shopName}</h3>
                    <p className="text-sm text-muted-foreground">{shopType}</p>
                    <div className="flex items-center gap-2 mt-2">
                        <StarIcon className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium">{rating}</span>
                        <span className="text-sm text-muted-foreground">({reviews.length} reviews)</span>
                    </div>
                </div>
            </div>
            <div className="mt-4 flex justify-between items-center">
                <Button variant="outline" size="sm">
                    View Details
                </Button>
                <Button size="sm">Call Now</Button>
            </div>
        </Card>
    )
}