import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "../components/ui/carousel";
import { ArrowLeft, ArrowLeftIcon, StarIcon } from "lucide-react";
import CommentBox from "../components/CommentBox";
import CommentList from "../components/commentList";

export default function Shop() {
  const shopId = useParams().id;
  const category = useParams().category;
  const [comments, setComments] = useState([]);
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
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
      <Link to={`/category/${category}`} className="flex items-center gap-2 hover:underline" >
        <ArrowLeftIcon className="h-5 w-5" />
        <span>Back</span>
      </Link>
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{shop.shopname}</h1>
          <p className="text-muted-foreground mt-2 text-sm md:text-base">{shop.location}</p>
          <div className="flex items-center gap-2 mt-4">
            <div className="flex items-center gap-0.5">
              <StarIcon className="w-4 h-4 md:w-5 md:h-5 fill-primary" />
              <StarIcon className="w-4 h-4 md:w-5 md:h-5 fill-primary" />
              <StarIcon className="w-4 h-4 md:w-5 md:h-5 fill-primary" />
              <StarIcon className="w-4 h-4 md:w-5 md:h-5 fill-primary" />
              <StarIcon className="w-4 h-4 md:w-5 md:h-5 fill-muted stroke-muted-foreground" />
            </div>
            <span className="text-lg font-medium">{shop?.rating}</span>
            <span className="text-muted-foreground text-sm">{`${comments.length} reviews`}</span>
          </div>
          <div className="mt-6 md:mt-8">
            <h2 className="text-xl md:text-2xl font-bold">{`About The ${shop.shopname}`}</h2>
            <p className="mt-2 text-muted-foreground text-sm md:text-base">{shop.about}</p>
          </div>

          {/* Services Section */}
          <div className="mt-6 md:mt-8">
            <h2 className="text-xl md:text-2xl font-bold">Services Offered</h2>
            <ul className="mt-4 space-y-2">
              {shop.services?.map((service, index) => (
                <li key={index} className="flex justify-between">
                  <span className="text-muted-foreground text-sm md:text-base">{service.service}</span>
                  <span className="text-primary font-semibold text-sm md:text-base">{`$${service.price}`}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <Carousel className="w-full">
            <CarouselContent>
              {shop.images?.map((image, index) => (
                <CarouselItem key={index}>
                  <img src={image} alt={`Shop Image ${index + 1}`} className="w-full h-auto max-h-72 md:max-h-96 object-cover rounded-md" />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
      <div className="mt-12">
        <CommentBox shopId={shopId} />
        <h2 className="text-xl md:text-2xl font-bold mt-6">Customer Reviews</h2>
        <div className="mt-4 md:mt-6 grid gap-4 md:gap-6">
          {comments.map((comment) => (
            <CommentList user={comment.user} key={comment.id} comment={comment.comment} />
          ))}
        </div>
      </div>
    </div>
  );
}
