import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "../components/ui/carousel"
import { ArrowLeft, StarIcon } from "lucide-react"
import CommentBox from "../components/CommentBox"
import CommentList from "../components/commentList"


export default function Shop({shopId}) {
  const [comment, setComment] = useState("");
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
        // setShop(shop);
        // setComments(comments);
        setComments(comments || demoComments);
        setShop(shop || demoData);
      })
      .catch((error) => console.error("Error:", error))
  }, []);

  const demoData = {
    "id": 1,
    "shopname": "Acme Shopping Mall",
    "shoplocation": "Chennai",
    "rating": 4.8,
    "about": "Acme Shopping Mall is the best place to shop for all your needs. We have a wide range of products and services to cater to the varied requirements of our customers. Our staff at Acme Shopping Mall are courteous and prompt at providing any assistance. We readily answer any queries or questions that you may have. Pay for the product or service with ease by using any of the available modes of payment, such as Cash, Debit Cards, Cheques, Credit Card. This establishment is functional from 10:00 - 21:00.",
    "images": ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
  }

  const demoComments = [
    {
      "id": 1,
      "user": "Madhan",
      "comment": "This is a great shop. I love the products and services. The staff are very helpful and friendly. I highly recommend this shop to everyone.",
      "rating": 5
    },
    {
      "id": 2,
      "user": "John",
      "comment": "I had a great experience shopping at this shop. The products are of high quality and the staff are very helpful and friendly. I highly recommend this shop to everyone.",
      "rating": 5
    },
    {
      "id": 3,
      "user": "Jane",
      "comment": "I had a great experience shopping at this shop. The products are of high quality and the staff are very helpful and friendly. I highly recommend this shop to everyone.",
      "rating": 5
    }
  ]

  return (
    <>
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
    <button style={{backgroundColor : "black", borderRadius : "30px", width : "40px", display : "grid", placeContent : "center"}}>
    <Link to={'/'}>
    <ArrowLeft style={{color : "white"}}/>
    </Link>
    </button>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h1 className="text-3xl font-bold">{shop.shopname}</h1>
          <p className="text-muted-foreground mt-2">{shop.shoplocation}</p>
          <div className="flex items-center gap-2 mt-4">
            <div className="flex items-center gap-0.5">
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
            </div>
            <span className="text-lg font-medium">{shop?.rating}</span>
            <span className="text-muted-foreground">{`${comments.length} reviews`}</span>
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-bold">{`About The ${shop.shopname}`}</h2>
            <p className="mt-2 text-muted-foreground">
            {shop.about}
            </p>
          </div>
        </div>
        <div>
          <Carousel className="w-full">
            <CarouselContent>
            {
              shop.images?.map((image, index) => (
                <CarouselItem key={index}>
                  <img
                    src={image}
                    width={600}
                    height={400}
                    alt={`Shop Image ${index + 1}`}
                    className="aspect-[3/2] object-cover rounded-md"
                  />
                </CarouselItem>
              ))
            }
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
      <div className="mt-12">
      <CommentBox shopId={shopId} comment={comment} setComment={setComment}/>
        <h2 className="text-2xl font-bold">Customer Reviews</h2>
        <div className="mt-6 grid gap-6">
         {comments.map( comment => <CommentList user={ comment.user } key={comment.id} comment={comment.comment}/>)}
        </div>
      </div>
    </div>
    </>
  )
}