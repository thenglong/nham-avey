import React from "react"

import { Tab } from "@headlessui/react"
import clsx from "clsx"
import { AnimatePresence, motion } from "framer-motion"
import { NextSeo } from "next-seo"
import { useRouter } from "next/router"

import { Restaurant, useRestaurantBySlugQuery } from "@nham-avey/common"
import DishCard from "src/components/cards/dish-card"
import { AuthedLayout } from "src/components/layout/authed-layout"
import RestaurantInfo from "src/components/pages/restaurant-page/restaurant-info"
import RestaurantMap from "src/components/pages/restaurant-page/restaurant-map"
import { APP_NAME } from "src/constants/common-constants"

export const RestaurantPage = () => {
  const { query } = useRouter()
  const { slug } = query
  const { data } = useRestaurantBySlugQuery({
    variables: {
      slug: slug as string,
    },
  })
  //
  // const [orderStarted, setOrderStarted] = useState(false)
  // const [orderItems, setOrderItems] = useState<CreateOrderItemInput[]>([])
  // const triggerStartOrder = () => {
  //   setOrderStarted(true)
  // }
  // const getItem = (dishId: number) => {
  //   return orderItems.find(order => order.dishId === dishId)
  // }
  //
  // const isSelected = (dishId: number) => {
  //   return Boolean(getItem(dishId))
  // }
  //
  // const addItemToOrder = (dishId: number) => {
  //   if (isSelected(dishId)) {
  //     return
  //   }
  //   setOrderItems(current => [{ dishId, options: [] }, ...current])
  // }
  // const removeFromOrder = (dishId: number) => {
  //   setOrderItems(current => current.filter(dish => dish.dishId !== dishId))
  // }
  // const addOptionToItem = (dishId: number, optionName: string) => {
  //   if (!isSelected(dishId)) {
  //     return
  //   }
  //   const oldItem = getItem(dishId)
  //   if (oldItem) {
  //     const hasOption = Boolean(
  //       oldItem.options?.find(aOption => aOption.name === optionName),
  //     )
  //     if (!hasOption) {
  //       removeFromOrder(dishId)
  //       setOrderItems(current => [
  //         {
  //           dishId,
  //           options: [{ name: optionName }, ...(oldItem?.options || [])],
  //         },
  //         ...current,
  //       ])
  //     }
  //   }
  // }
  //
  // const removeOptionFromItem = (dishId: number, optionName: string) => {
  //   if (!isSelected(dishId)) {
  //     return
  //   }
  //   const oldItem = getItem(dishId)
  //   if (oldItem) {
  //     removeFromOrder(dishId)
  //     setOrderItems(current => [
  //       {
  //         dishId,
  //         options: oldItem.options?.filter(
  //           option => option.name !== optionName,
  //         ),
  //       },
  //       ...current,
  //     ])
  //     return
  //   }
  // }
  //
  // const getOptionFromItem = (
  //   item: CreateOrderItemInput,
  //   optionName: string,
  // ) => {
  //   return item.options?.find(option => option.name === optionName)
  // }
  // const isOptionSelected = (dishId: number, optionName: string) => {
  //   const item = getItem(dishId)
  //   if (item) {
  //     return Boolean(getOptionFromItem(item, optionName))
  //   }
  //   return false
  // }
  // const triggerCancelOrder = () => {
  //   setOrderStarted(false)
  //   setOrderItems([])
  // }
  //
  // const router = useRouter()
  // const onCompleted = (data: CreateOrderMutation) => {
  //   const {
  //     createOrder: { ok, orderId },
  //   } = data
  //   if (ok) {
  //     router.push(`/orders/${orderId}`)
  //   }
  // }
  //
  // const [createOrderMutation, { loading: placingOrder }] =
  //   useCreateOrderMutation({
  //     onCompleted,
  //   })
  //
  // const triggerConfirmOrder = () => {
  //   if (placingOrder) {
  //     return
  //   }
  //   if (orderItems.length === 0) {
  //     alert("Can't place empty order")
  //     return
  //   }
  //   const ok = window.confirm("You are about to place an order")
  //   if (ok) {
  //     createOrderMutation({
  //       variables: {
  //         input: {
  //           restaurantId: data?.restaurantBySlug.data?.id as number,
  //           items: orderItems,
  //         },
  //       },
  //     })
  //   }
  // }

  return (
    <AuthedLayout>
      <NextSeo title={`${data?.restaurantBySlug.data?.name} | ${APP_NAME}`} />

      {/* Restaurant Info Section*/}
      <div className="bg-gray-100 py-10">
        <div className="container mx-auto flex w-full flex-col items-center gap-8 px-4 md:flex-row md:gap-3 lg:px-8">
          <div className="w-full md:w-2/3">
            <RestaurantInfo
              restaurant={data?.restaurantBySlug.data as Restaurant}
            />
          </div>
          <div className="aspect-[35/23] w-full overflow-hidden rounded-xl shadow-lg ring-4 ring-base-100 md:ml-auto md:w-1/3 md:max-w-[350px]">
            <RestaurantMap />
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-10 px-4 lg:px-8">
        <Tab.Group>
          <Tab.List className="flex gap-5">
            {["Menu", "Review"].map(item => (
              <Tab
                key={item}
                className={({ selected }) =>
                  clsx("h5 outline-none", {
                    "text-gray-400": !selected,
                  })
                }
              >
                {item}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            <AnimatePresence exitBeforeEnter>
              <Tab.Panel
                as={motion.div}
                initial="hide"
                animate="show"
                exit="hide"
                variants={{
                  hide: {
                    opacity: 0,
                    transition: {
                      duration: 0.5,
                      ease: "linear",
                      when: "beforeChildren",
                    },
                  },
                  show: {
                    opacity: 1,
                    transition: {
                      duration: 0.5,
                      ease: "linear",
                      when: "beforeChildren",
                    },
                  },
                }}
              >
                <div className="mb-12 mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  <DishCard />
                  <DishCard />
                  <DishCard />
                  <DishCard />
                  <DishCard />
                  <DishCard />
                  <DishCard />
                  <DishCard />
                  <DishCard />
                  <DishCard />
                  <DishCard />
                  <DishCard />
                  <DishCard />
                  <DishCard />
                  <DishCard />
                </div>
              </Tab.Panel>
            </AnimatePresence>
            <AnimatePresence>
              <Tab.Panel
                as={motion.div}
                initial="hide"
                animate="show"
                exit="hide"
                variants={{
                  hide: {
                    opacity: 0,
                    transition: {
                      duration: 0.5,
                      ease: "linear",
                      when: "beforeChildren",
                    },
                  },
                  show: {
                    opacity: 1,
                    transition: {
                      duration: 0.5,
                      ease: "linear",
                      when: "beforeChildren",
                    },
                  },
                }}
              >
                Review
              </Tab.Panel>
            </AnimatePresence>
          </Tab.Panels>
        </Tab.Group>
      </div>

      {/*<div className="container mx-auto px-4 lg:px-8">*/}
      {/*  <div className="container mt-20 flex flex-col items-end pb-32">*/}
      {/*    {!orderStarted && (*/}
      {/*      <button className="btn px-10" onClick={triggerStartOrder}>*/}
      {/*        Start Order*/}
      {/*      </button>*/}
      {/*    )}*/}
      {/*    {orderStarted && (*/}
      {/*      <div className="flex items-center">*/}
      {/*        <button className="btn mr-3 px-10" onClick={triggerConfirmOrder}>*/}
      {/*          Confirm Order*/}
      {/*        </button>*/}
      {/*        <button*/}
      {/*          className="btn bg-black px-10 hover:bg-black"*/}
      {/*          onClick={triggerCancelOrder}*/}
      {/*        >*/}
      {/*          Cancel Order*/}
      {/*        </button>*/}
      {/*      </div>*/}
      {/*    )}*/}
      {/*    <div className="mt-16 grid w-full gap-x-5 gap-y-10 md:grid-cols-3">*/}
      {/*      {data?.restaurantBySlug?.data?.menu?.map((dish, index) => (*/}
      {/*        <Dish*/}
      {/*          id={dish.id}*/}
      {/*          isSelected={isSelected(dish.id)}*/}
      {/*          orderStarted={orderStarted}*/}
      {/*          key={index}*/}
      {/*          name={dish.name}*/}
      {/*          description={dish.description}*/}
      {/*          price={dish.price}*/}
      {/*          isCustomer={true}*/}
      {/*          options={dish.options}*/}
      {/*          addItemToOrder={addItemToOrder}*/}
      {/*          removeFromOrder={removeFromOrder}*/}
      {/*        >*/}
      {/*          {dish.options?.map((option, index) => (*/}
      {/*            <DishOption*/}
      {/*              key={index}*/}
      {/*              isSelected={isOptionSelected(dish.id, option.name)}*/}
      {/*              name={option.name}*/}
      {/*              extra={option.extra}*/}
      {/*              dishId={dish.id}*/}
      {/*              addOptionToItem={addOptionToItem}*/}
      {/*              removeOptionFromItem={removeOptionFromItem}*/}
      {/*            />*/}
      {/*          ))}*/}
      {/*        </Dish>*/}
      {/*      ))}*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </AuthedLayout>
  )
}

export default RestaurantPage
