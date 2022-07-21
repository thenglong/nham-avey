import {
  AdminCreateRestaurantMutationOptions,
  useAdminCreateRestaurantMutation,
} from "@nham-avey/common"
import { Drawer } from "antd"
import RestaurantForm, {
  RestaurantFormSubmitValue,
} from "src/components/form/restaurant-form"

interface CreateRestaurantDrawerProps {
  visible: boolean
  onCompleted: AdminCreateRestaurantMutationOptions["onCompleted"]
  onClose: () => void
}

export function CreateRestaurantDrawer({
  visible,
  onCompleted,
  onClose,
}: CreateRestaurantDrawerProps) {
  const [create, { loading: isCreating }] = useAdminCreateRestaurantMutation({
    onCompleted,
  })

  const onFinish = async (values: RestaurantFormSubmitValue) => {
    const { logoImageUrl, coverImageUrls, categories, name, address, vendorIds } = values
    try {
      await create({
        variables: {
          input: {
            logoImageUrl,
            coverImageUrls,
            categories,
            name,
            address,
            vendorIds,
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
      title="Create Restaurant"
      className="max-w-full"
      contentWrapperStyle={{
        maxWidth: "100%",
      }}
    >
      <RestaurantForm onSubmit={onFinish} isLoading={isCreating} />
    </Drawer>
  )
}

export default CreateRestaurantDrawer
