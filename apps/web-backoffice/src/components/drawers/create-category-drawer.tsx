import {
  AdminCreateCategoryMutationOptions,
  useAdminCreateCategoryMutation,
} from "@nham-avey/common"
import { Drawer } from "antd"
import CreateCategoryForm from "src/components/form/create-category-form"

interface CreateCategoryDrawerProps {
  visible: boolean
  onCompleted: AdminCreateCategoryMutationOptions["onCompleted"]
  onClose: () => void
}

export function CreateCategoryDrawer({
  visible,
  onCompleted,
  onClose,
}: CreateCategoryDrawerProps) {
  const [create, { loading: isCreating }] = useAdminCreateCategoryMutation({
    onCompleted,
  })

  return (
    <Drawer
      width={500}
      placement="right"
      visible={visible}
      forceRender
      onClose={onClose}
      title="Create Category"
      className="max-w-full"
      contentWrapperStyle={{
        maxWidth: "100%",
      }}
    >
      <CreateCategoryForm onSubmit={create} isLoading={isCreating} />
    </Drawer>
  )
}

export default CreateCategoryDrawer
