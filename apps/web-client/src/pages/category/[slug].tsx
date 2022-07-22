import { useRouter } from "next/router"

/**
 * @todo Implement this component.
 */
const CategoryPage = () => {
  // const { query } = useRouter()
  // const { slug } = query
  // const { data, loading } = useCategoryQuery({
  //   variables: {
  //     input: {
  //       page: 1,
  //       slug: slug as string,
  //     },
  //   },
  // })
  //
  // if (loading) return <p>Loading...</p>

  return <pre>{JSON.stringify({}, null, 2)}</pre>
}

export default CategoryPage
