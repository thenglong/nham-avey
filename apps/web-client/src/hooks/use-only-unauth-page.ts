import { useRouter } from "next/router"

import { useGetMeQuery } from "../__generated__/types.react-apollo"

const useOnlyUnauthPage = () => {
  const { data } = useGetMeQuery()
  const router = useRouter()
  if (data) {
    router.push("/")
  }
}

export default useOnlyUnauthPage
