import { useRouter } from "next/router"

import { useGetMeQuery } from "../__generated__/types.react-apollo"

const useOnlyAuthPage = () => {
  const { data } = useGetMeQuery()
  const router = useRouter()
  if (!data) {
    router.push("/login")
  }
}

export default useOnlyAuthPage
