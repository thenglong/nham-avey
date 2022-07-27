import { GetStaticPropsContext } from "next"

import {
  AllRestaurantsSlugDocument,
  AllRestaurantsSlugQuery,
  AllRestaurantsSlugQueryVariables,
  RestaurantBySlugDocument,
  RestaurantBySlugQuery,
  RestaurantBySlugQueryVariables,
} from "@nham-avey/common"
import RestaurantPage from "src/components/pages/restaurant-page/restaurant-page"
import { addApolloState, initializeApollo } from "src/graphql/apollo-config"

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const apolloClient = initializeApollo()

  await apolloClient.query<
    RestaurantBySlugQuery,
    RestaurantBySlugQueryVariables
  >({
    query: RestaurantBySlugDocument,
    variables: { slug: params?.slug as string },
    fetchPolicy: "network-only",
  })

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 2,
  })
}

export const getStaticPaths = async () => {
  const apolloClient = initializeApollo()
  const { data } = await apolloClient.query<
    AllRestaurantsSlugQuery,
    AllRestaurantsSlugQueryVariables
  >({
    query: AllRestaurantsSlugDocument,
    fetchPolicy: "no-cache",
  })

  const paths =
    data.allRestaurantsSlug?.slugs?.map(slug => ({
      params: { slug: slug },
    })) || []

  return { paths, fallback: "blocking" }
}

export default RestaurantPage
