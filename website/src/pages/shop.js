import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../components/ui/carousel";
import { ArrowLeftIcon, StarIcon } from "lucide-react";
import CommentBox from "../components/CommentBox";
import CommentList from "../components/commentList";

export default function Shop() {
  const { id: shopId, category } = useParams();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [shop, setShop] = useState({});

  useEffect(() => {
    fetch(`http://localhost:3001/shop/${shopId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const { shop, comments } = data;
        setShop(shop);
        setComments(comments);
      })
      .catch((error) => console.error("Error:", error));
  }, [comment]);

  let totalRating = shop?.averageRating || 1;
  totalRating = totalRating.toFixed(1);

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 overflow-hidden">
      <Link to={`/category/${category}`} className="flex items-center gap-2 hover:underline">
        <ArrowLeftIcon className="h-5 w-5" />
        <span>Back</span>
      </Link>
      <div className="grid gap-8 md:grid-cols-2 mt-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{shop.shopname}</h1>
          <p className="text-muted-foreground mt-2 text-sm md:text-base">{shop.location}</p>
          <p className="text-muted-foreground mt-2 text-sm md:text-base font-semibold">{`Type: ${shop.shoptype}`}</p>
          <div className="flex items-center gap-2 mt-4">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, index) => (
                <StarIcon
                  key={index}
                  className={`w-4 h-4 md:w-5 md:h-5 ${
                    index < Math.floor(shop.averageRating)
                      ? "fill-primary"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <span className="text-lg font-medium">{totalRating}</span>
            <span className="text-muted-foreground text-sm">{`${comments.length} reviews`}</span>
          </div>
          <div className="mt-6 md:mt-8">
            <h2 className="text-xl md:text-2xl font-bold">{`About ${shop.shopname}`}</h2>
            <p className="mt-2 text-muted-foreground text-sm md:text-base">{shop.about}</p>
          </div>

          <div className="mt-6 md:mt-8">
            <h2 className="text-xl md:text-2xl font-bold">Services Offered</h2>
            <ul className="mt-4 space-y-2">
              {shop.services?.map((service, index) => (
                <li key={index} className="flex justify-between">
                  <span className="text-muted-foreground text-sm md:text-base">{service.service}</span>
                  <span className="text-primary font-semibold text-sm md:text-base">{`₹${service.price}`}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 md:mt-8">
            <h2 className="text-xl md:text-2xl font-bold">Contact Information</h2>
            <p className="mt-2 text-muted-foreground text-sm md:text-base">
              <strong>Email:</strong> {shop.email}
            </p>
            <p className="mt-2 text-muted-foreground text-sm md:text-base">
              <strong>Phone:</strong> {shop.mobilenumber}
            </p>
          </div>

          <div className="mt-6 md:mt-8">
            <h2 className="text-xl md:text-2xl font-bold">Opening Hours</h2>
            <p className="mt-2 text-muted-foreground text-sm md:text-base">
              <strong>Open:</strong> {shop.opentime} <strong>Close:</strong> {shop.closetime}
            </p>
          </div>
        </div>
        <div className="md:order-2 order-1 overflow-hidden">
          <Carousel className="w-full overflow-hidden">
            <CarouselContent>
              {shop.images?.map((image, index) => (
                <CarouselItem key={index}>
                  <img
                    src={image}
                    alt={`Shop Image ${index + 1}`}
                    className="w-full h-auto max-h-72 md:max-h-96 object-cover rounded-md max-w-full"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
      <div className="mt-12">
        <CommentBox shopId={shopId} comment={comment} setComment={setComment} />
        <h2 className="text-xl md:text-2xl font-bold mt-6">Customer Reviews</h2>
        <div className="mt-4 md:mt-6 grid gap-4 md:gap-6">
          {comments.map((comment) => (
            <CommentList
              username={comment.username}
              key={comment.id}
              comment={comment.comment}
              rating={comment.rating}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
