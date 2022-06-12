import { NextSeo } from "next-seo"
import Link from "next/link"

const NotFoundPage = () => (
  <div className="flex h-screen flex-col items-center justify-center">
    <NextSeo title="Not Found | Nham Avey" />
    <h2 className="mb-3 text-2xl font-semibold">Page Not Found</h2>
    <h4 className="mb-5 text-base font-medium">
      The page you&lsquo;re looking for does not exist or has moved
    </h4>
    <Link className="text-lime-600 hover:underline" href="/">
      Go back home &rarr;
    </Link>
  </div>
)

export default NotFoundPage
