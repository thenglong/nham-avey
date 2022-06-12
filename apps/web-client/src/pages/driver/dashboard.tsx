import { useEffect } from "react"

import GoogleMapReact from "google-map-react"
import { useRouter } from "next/router"

import {
  TakeOrderMutation,
  useCookedOrdersSubscription,
  useTakeOrderMutation,
} from "../../__generated__/types.react-apollo"

export const DashboardPage = () => {
  const { data: cookedOrdersData } = useCookedOrdersSubscription()

  useEffect(() => {
    if (cookedOrdersData?.cookedOrders.id) {
      // TODO
    }
  }, [cookedOrdersData])

  const router = useRouter()

  const onCompleted = (data: TakeOrderMutation) => {
    if (data.takeOrder.ok) {
      router.push(`/opders/${cookedOrdersData?.cookedOrders.id}`)
    }
  }

  const [takeOrderMutation] = useTakeOrderMutation({
    onCompleted,
  })

  const triggerMutation = (orderId: number) => {
    takeOrderMutation({
      variables: {
        input: {
          id: orderId,
        },
      },
    })
  }

  return (
    <div>
      <div
        className="overflow-hidden"
        style={{ width: window.innerWidth, height: "95vh" }}
      >
        <GoogleMapReact
          defaultCenter={{ lat: 37.58, lng: 126.95 }}
          defaultZoom={20}
          bootstrapURLKeys={{ key: "NoKEY" }}
        ></GoogleMapReact>
      </div>
      <div className="shado-lg relative -top-10 mx-auto max-w-screen-sm bg-white px-5 py-8">
        {cookedOrdersData?.cookedOrders.restaurant ? (
          <>
            <h1 className="text-center text-3xl font-medium">New Cooked Order</h1>
            <h1 className="my-3 text-center text-3xl font-medium">
              Pick it up soon @ {cookedOrdersData?.cookedOrders.restaurant?.name}
            </h1>
            <button
              onClick={() => triggerMutation(cookedOrdersData?.cookedOrders.id)}
              className="btn mt-5 block w-full text-center"
            >
              Accept Challenge $rarr;
            </button>
          </>
        ) : (
          <h1 className="text-center text-3xl font-medium">No Orders yet</h1>
        )}
      </div>
    </div>
  )
}
