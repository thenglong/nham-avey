import { useState } from "react"

import { GetStaticPropsContext } from "next"
import { NextSeo } from "next-seo"
import { useRouter } from "next/router"

import {
  CreateOrderItemInput,
  CreateOrderMutation,
  PublicGetRestaurantByIdDocument,
  PublicGetRestaurantByIdQuery,
  PublicGetRestaurantByIdQueryVariables,
  useCreateOrderMutation,
  usePublicGetRestaurantByIdQuery,
} from "@nham-avey/common"
import { Dish } from "src/components/dish"
import { DishOption } from "src/components/dish-option"
import { addApolloState, initializeApollo } from "src/graphql/apollo-config"

export const getServerSideProps = async ({ params }: GetStaticPropsContext) => {
  const apolloClient = initializeApollo()

  await apolloClient.query<
    PublicGetRestaurantByIdQuery,
    PublicGetRestaurantByIdQueryVariables
  >({
    query: PublicGetRestaurantByIdDocument,
    variables: { restaurantId: +(params?.id as string) },
  })

  return addApolloState(apolloClient, {
    props: {},
  })
}

const RestaurantPage = () => {
  const { query } = useRouter()
  const { id } = query
  const { data } = usePublicGetRestaurantByIdQuery({
    variables: {
      restaurantId: +(id as string),
    },
  })

  const [orderStarted, setOrderStarted] = useState(false)
  const [orderItems, setOrderItems] = useState<CreateOrderItemInput[]>([])
  const triggerStartOrder = () => {
    setOrderStarted(true)
  }
  const getItem = (dishId: number) => {
    return orderItems.find(order => order.dishId === dishId)
  }

  const isSelected = (dishId: number) => {
    return Boolean(getItem(dishId))
  }

  const addItemToOrder = (dishId: number) => {
    if (isSelected(dishId)) {
      return
    }
    setOrderItems(current => [{ dishId, options: [] }, ...current])
  }
  const removeFromOrder = (dishId: number) => {
    setOrderItems(current => current.filter(dish => dish.dishId !== dishId))
  }
  const addOptionToItem = (dishId: number, optionName: string) => {
    if (!isSelected(dishId)) {
      return
    }
    const oldItem = getItem(dishId)
    if (oldItem) {
      const hasOption = Boolean(
        oldItem.options?.find(aOption => aOption.name === optionName)
      )
      if (!hasOption) {
        removeFromOrder(dishId)
        setOrderItems(current => [
          { dishId, options: [{ name: optionName }, ...(oldItem?.options || [])] },
          ...current,
        ])
      }
    }
  }

  const removeOptionFromItem = (dishId: number, optionName: string) => {
    if (!isSelected(dishId)) {
      return
    }
    const oldItem = getItem(dishId)
    if (oldItem) {
      removeFromOrder(dishId)
      setOrderItems(current => [
        {
          dishId,
          options: oldItem.options?.filter(option => option.name !== optionName),
        },
        ...current,
      ])
      return
    }
  }

  const getOptionFromItem = (item: CreateOrderItemInput, optionName: string) => {
    return item.options?.find(option => option.name === optionName)
  }
  const isOptionSelected = (dishId: number, optionName: string) => {
    const item = getItem(dishId)
    if (item) {
      return Boolean(getOptionFromItem(item, optionName))
    }
    return false
  }
  const triggerCancelOrder = () => {
    setOrderStarted(false)
    setOrderItems([])
  }

  const router = useRouter()
  const onCompleted = (data: CreateOrderMutation) => {
    const {
      createOrder: { ok, orderId },
    } = data
    if (ok) {
      router.push(`/orders/${orderId}`)
    }
  }

  const [createOrderMutation, { loading: placingOrder }] = useCreateOrderMutation({
    onCompleted,
  })

  const triggerConfirmOrder = () => {
    if (placingOrder) {
      return
    }
    if (orderItems.length === 0) {
      alert("Can't place empty order")
      return
    }
    const ok = window.confirm("You are about to place an order")
    if (ok) {
      createOrderMutation({
        variables: {
          input: {
            restaurantId: +(id as string),
            items: orderItems,
          },
        },
      })
    }
  }

  return (
    <div>
      <NextSeo title={`${data?.publicGetRestaurantById.restaurant?.name} | Nham Avey`} />
      <div
        className="bg-gray-800 bg-cover bg-center py-48"
        style={{
          backgroundImage: `url(${data?.publicGetRestaurantById.restaurant?.coverImageUrls?.[0]})`,
        }}
      >
        <div className="w-3/12 bg-white py-8 pl-48">
          <h4 className="mb-3 text-4xl">
            {data?.publicGetRestaurantById.restaurant?.name}
          </h4>
          <h5 className="mb-2 text-sm font-light">
            {data?.publicGetRestaurantById.restaurant?.categories
              ?.map(category => category.name)
              .join(", ")}
          </h5>

          <h6 className="text-sm font-light">
            {data?.publicGetRestaurantById.restaurant?.address}
          </h6>
        </div>
      </div>

      <div className="container mt-20 flex flex-col items-end pb-32">
        {!orderStarted && (
          <button className="btn px-10" onClick={triggerStartOrder}>
            Start Order
          </button>
        )}
        {orderStarted && (
          <div className="flex items-center">
            <button className="btn mr-3 px-10" onClick={triggerConfirmOrder}>
              Confirm Order
            </button>
            <button
              className="btn bg-black px-10 hover:bg-black"
              onClick={triggerCancelOrder}
            >
              Cancel Order
            </button>
          </div>
        )}
        <div className="mt-16 grid w-full gap-x-5 gap-y-10 md:grid-cols-3">
          {data?.publicGetRestaurantById?.restaurant?.menu?.map((dish, index) => (
            <Dish
              id={dish.id}
              isSelected={isSelected(dish.id)}
              orderStarted={orderStarted}
              key={index}
              name={dish.name}
              description={dish.description}
              price={dish.price}
              isCustomer={true}
              options={dish.options}
              addItemToOrder={addItemToOrder}
              removeFromOrder={removeFromOrder}
            >
              {dish.options?.map((option, index) => (
                <DishOption
                  key={index}
                  isSelected={isOptionSelected(dish.id, option.name)}
                  name={option.name}
                  extra={option.extra}
                  dishId={dish.id}
                  addOptionToItem={addOptionToItem}
                  removeOptionFromItem={removeOptionFromItem}
                />
              ))}
            </Dish>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RestaurantPage
