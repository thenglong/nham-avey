import {
  AdminCreateRestaurantMutationOptions,
  useAdminCreateRestaurantMutation,
} from "@nham-avey/common"
import { Drawer } from "antd"
import CreateRestaurantForm from "src/components/form/create-restaurant-form"

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
      <CreateRestaurantForm onSubmit={create} isLoading={isCreating} />
    </Drawer>
  )
}

export default CreateRestaurantDrawer
