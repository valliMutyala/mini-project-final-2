import React from "react"
import { Link } from "react-router-dom"

export default function NotFoundPage() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section className="w-full pt-12 md:pt-24 lg:pt-32 bg-background border-y">
          <div className="container px-4 md:px-6 space-y-10 xl:space-y-16">
            <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
              <div>
                <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] text-primary">
                  404 - Page Not Found
                </h1>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  The page you are looking for does not exist. Please check the URL or navigate back to the homepage.
                </p>
                <Link
                  to='/'
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Go to Homepage
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                src="/placeholder.svg"
                alt="404 Error"
                width="600"
                height="400"
                className="rounded-lg shadow-lg"
                style={{ aspectRatio: "600/400", objectFit: "cover" }}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}