import {
  AdminCreateAdminMutationOptions,
  useAdminCreateAdminMutation,
} from "@nham-avey/common"
import { Drawer } from "antd"
import CreateAdminForm from "src/components/form/create-admin-form"

interface CreateAdminDrawerProps {
  visible: boolean
  onCompleted: AdminCreateAdminMutationOptions["onCompleted"]
  onClose: () => void
}

export function CreateAdminDrawer({
  visible,
  onCompleted,
  onClose,
}: CreateAdminDrawerProps) {
  const [create, { loading: isCreating }] = useAdminCreateAdminMutation({
    onCompleted,
  })

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
      <CreateAdminForm onSubmit={create} isLoading={isCreating} />
    </Drawer>
  )
}

export default CreateAdminDrawer
