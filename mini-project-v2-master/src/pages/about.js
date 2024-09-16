import React from "react"
export default function () {
    return (
      <div className="flex flex-col min-h-[100dvh]">
        <main className="flex-1">
          <section className="w-full pt-12 md:pt-24 lg:pt-32 border-y">
            <div className="container px-4 md:px-6 space-y-10 xl:space-y-16">
              <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
                <div>
                  <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                    About Neighborhood Navigator
                  </h1>
                </div>
                <div className="flex flex-col items-start space-y-4">
                  <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                    Neighborhood Navigator is a comprehensive platform that helps users discover and explore local
                    businesses, services, and community resources in their neighborhood. Our mission is to connect people
                    with the vibrant local communities they live in and foster a sense of belonging.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container space-y-12 px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Key Features</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Neighborhood Navigator offers a range of features to help you discover and engage with your local
                    community.
                  </p>
                </div>
              </div>
              <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
                <div className="grid gap-1">
                  <h3 className="text-lg font-bold">Comprehensive Search</h3>
                  <p className="text-sm text-muted-foreground">
                    Search for local businesses, services, and community resources by name, category, or location.
                  </p>
                </div>
                <div className="grid gap-1">
                  <h3 className="text-lg font-bold">Business Listings</h3>
                  <p className="text-sm text-muted-foreground">
                    Discover detailed information, photos, and user reviews for local businesses and service providers.
                  </p>
                </div>
                <div className="grid gap-1">
                  <h3 className="text-lg font-bold">Community Forums</h3>
                  <p className="text-sm text-muted-foreground">
                    Engage with your neighbors, share local news and events, and discuss community-related topics.
                  </p>
                </div>
                <div className="grid gap-1">
                  <h3 className="text-lg font-bold">User Reviews</h3>
                  <p className="text-sm text-muted-foreground">
                    Read and share reviews to help others make informed decisions about local businesses and services.
                  </p>
                </div>
                <div className="grid gap-1">
                  <h3 className="text-lg font-bold">Personalized Recommendations</h3>
                  <p className="text-sm text-muted-foreground">
                    Get tailored recommendations based on your interests, location, and past interactions with the
                    platform.
                  </p>
                </div>
                <div className="grid gap-1">
                  <h3 className="text-lg font-bold">Neighborhood Events</h3>
                  <p className="text-sm text-muted-foreground">
                    Stay up-to-date on local events, festivals, and community gatherings happening in your area.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
            <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
              <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Meet the Team</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  The dedicated team behind Neighborhood Navigator is passionate about connecting people with their local
                  communities.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <img
                    src="/placeholder.svg"
                    width="100"
                    height="100"
                    alt="Team Member"
                    className="rounded-full"
                    style={{ aspectRatio: "100/100", objectFit: "cover" }}
                  />
                  <h3 className="text-lg font-semibold">John Doe</h3>
                  <p className="text-muted-foreground">Co-Founder</p>
                </div>
                <div className="flex flex-col items-center justify-center space-y-2">
                  <img
                    src="/placeholder.svg"
                    width="100"
                    height="100"
                    alt="Team Member"
                    className="rounded-full"
                    style={{ aspectRatio: "100/100", objectFit: "cover" }}
                  />
                  <h3 className="text-lg font-semibold">Jane Smith</h3>
                  <p className="text-muted-foreground">Co-Founder</p>
                </div>
                <div className="flex flex-col items-center justify-center space-y-2">
                  <img
                    src="/placeholder.svg"
                    width="100"
                    height="100"
                    alt="Team Member"
                    className="rounded-full"
                    style={{ aspectRatio: "100/100", objectFit: "cover" }}
                  />
                  <h3 className="text-lg font-semibold">Michael Johnson</h3>
                  <p className="text-muted-foreground">Lead Developer</p>
                </div>
                <div className="flex flex-col items-center justify-center space-y-2">
                  <img
                    src="/placeholder.svg"
                    width="100"
                    height="100"
                    alt="Team Member"
                    className="rounded-full"
                    style={{ aspectRatio: "100/100", objectFit: "cover" }}
                  />
                  <h3 className="text-lg font-semibold">Emily Williams</h3>
                  <p className="text-muted-foreground">Community Manager</p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    )
  }