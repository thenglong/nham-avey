import React from "react"

import {
  AdminUpdateRestaurantMutationOptions,
  Restaurant,
  useAdminUpdateRestaurantMutation,
} from "@nham-avey/common"
import { Drawer } from "antd"
import RestaurantForm, {
  RestaurantFormSubmitValue,
} from "src/components/form/restaurant-form"

interface UpdateRestaurantDrawerProps {
  restaurant: Restaurant | null
  visible: boolean
  onCompleted: AdminUpdateRestaurantMutationOptions["onCompleted"]
  onClose: () => void
}

export function UpdateRestaurantDrawer({
  restaurant,
  visible,
  onCompleted,
  onClose,
}: UpdateRestaurantDrawerProps) {
  const [update, { loading: isUpdating }] = useAdminUpdateRestaurantMutation({
    onCompleted,
  })

  const onFinish = async (values: RestaurantFormSubmitValue) => {
    const { logoImageUrl, coverImageUrls, categories, name, address, vendorIds } = values
    try {
      await update({
        variables: {
          input: {
            logoImageUrl,
            coverImageUrls,
            categories,
            name,
            address,
            vendorIds,
            restaurantId: restaurant?.id as number,
          },
        },
      })
    } catch (e) {} // do nothing
  }

  return (
    <Drawer
      width={500}
      placement="right"
      visible={visible}
      forceRender
      onClose={onClose}
      title="Update Restaurant"
      className="max-w-full"
      contentWrapperStyle={{
        maxWidth: "100%",
      }}
    >
      <RestaurantForm
        initialValue={restaurant as Restaurant}
        onSubmit={onFinish}
        isLoading={isUpdating}
      />
    </Drawer>
  )
}

export default UpdateRestaurantDrawer
