interface CategoryParams {
  slug: string
}

export const Category = () => {
  const params = useParams<CategoryParams>()
  // const { data, loading } = useCategoryQuery({
  //   variables: {
  //     input: {
  //       page: 1,
  //       slug: params.slug,
  //     },
  //   },
  // })

  // TODO

  return <h1>Category</h1>
}
