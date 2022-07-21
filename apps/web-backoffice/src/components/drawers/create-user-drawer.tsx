import {
  AdminCreateAdminMutationOptions,
  useAdminCreateAdminMutation,
} from "@nham-avey/common"
import { Drawer } from "antd"
import AdminForm, { AdminFormSubmitValue } from "src/components/form/restaurant-form"

interface CreateAdminDrawerProps {
  visible: boolean
  onCompleted: AdminCreateAdminMutationOptions["onCompleted"]
  onClose: () => void
}

export function CreateUserDrawer({
  visible,
  onCompleted,
  onClose,
}: CreateAdminDrawerProps) {
  const [create, { loading: isCreating }] = useAdminCreateAdminMutation({
    onCompleted,
  })

  const onFinish = async (values: AdminFormSubmitValue) => {
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
      title="Create Admin"
      className="max-w-full"
      contentWrapperStyle={{
        maxWidth: "100%",
      }}
    >
      <AdminForm onSubmit={onFinish} isLoading={isCreating} />
    </Drawer>
  )
}

export default CreateUserDrawer
