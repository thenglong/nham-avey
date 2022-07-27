import { NextSeo } from "next-seo"
import Link from "next/link"

export const ComingSoonPage = () => (
  <div className="flex h-screen flex-col items-center justify-center">
    <NextSeo title="Not Found | Nham Avey" />
    <h2 className="mb-3 text-2xl font-semibold">Coming Soon</h2>
    <Link className="text-lime-600 hover:underline" href="/">
      Go back home &rarr;
    </Link>
  </div>
)

export default ComingSoonPage
