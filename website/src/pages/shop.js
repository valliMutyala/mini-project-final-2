
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "../components/ui/carousel"
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar"
import { ArrowLeft, StarIcon } from "lucide-react"
import CommentBox from "../components/CommentBox"
import { Color } from "maplibre-gl"
import { Link } from "react-router-dom"

export default function Shop() {
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
          <h1 className="text-3xl font-bold">The Cozy Corner</h1>
          <p className="text-muted-foreground mt-2">123 Main St, Anytown USA • (555) 555-5555</p>
          <div className="flex items-center gap-2 mt-4">
            <div className="flex items-center gap-0.5">
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
            </div>
            <span className="text-lg font-medium">4.7</span>
            <span className="text-muted-foreground">(124 reviews)</span>
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-bold">About The Cozy Corner</h2>
            <p className="mt-2 text-muted-foreground">
              The Cozy Corner is a charming local shop that offers a wide variety of handcrafted goods, from home decor
              to artisanal gifts. Owned and operated by a passionate team of local artisans, the shop is a hub for the
              community, showcasing the best of what the region has to offer.
            </p>
          </div>
        </div>
        <div>
          <Carousel className="w-full">
            <CarouselContent>
              <CarouselItem>
                <img
                  src="/placeholder.svg"
                  width={600}
                  height={400}
                  alt="Shop Image 1"
                  className="aspect-[3/2] object-cover rounded-md"
                />
              </CarouselItem>
              <CarouselItem>
                <img
                  src="/placeholder.svg"
                  width={600}
                  height={400}
                  alt="Shop Image 2"
                  className="aspect-[3/2] object-cover rounded-md"
                />
              </CarouselItem>
              <CarouselItem>
                <img
                  src="/placeholder.svg"
                  width={600}
                  height={400}
                  alt="Shop Image 3"
                  className="aspect-[3/2] object-cover rounded-md"
                />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
      <div className="mt-12">
      <CommentBox/>
        <h2 className="text-2xl font-bold">Customer Reviews</h2>
        <div className="mt-6 grid gap-6">
          <div className="flex gap-4">
            <Avatar className="w-10 h-10 border">
              <AvatarImage src="/placeholder-user.jpg" alt="@username" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">John Doe</h3>
                <div className="flex items-center gap-0.5">
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                </div>
              </div>
              <p className="mt-2 text-muted-foreground">
                I absolutely love this shop! The selection of handcrafted goods is amazing, and the staff is so friendly
                and knowledgeable. I always leave with something special.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <Avatar className="w-10 h-10 border">
              <AvatarImage src="/placeholder-user.jpg" alt="@username" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">Jane Smith</h3>
                <div className="flex items-center gap-0.5">
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                  <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                </div>
              </div>
              <p className="mt-2 text-muted-foreground">
                I've been a regular customer at The Cozy Corner for years. The quality of their products is always
                top-notch, and the prices are very reasonable. I highly recommend this shop to anyone looking for
                unique, locally-sourced items.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <Avatar className="w-10 h-10 border">
              <AvatarImage src="/placeholder-user.jpg" alt="@username" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">Michael Johnson</h3>
                <div className="flex items-center gap-0.5">
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-primary" />
                </div>
              </div>
              <p className="mt-2 text-muted-foreground">
                I recently discovered The Cozy Corner and I'm so glad I did! The shop has a wonderful selection of
                unique and beautifully crafted items. The staff is incredibly helpful and knowledgeable. I'll definitely
                be a repeat customer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}