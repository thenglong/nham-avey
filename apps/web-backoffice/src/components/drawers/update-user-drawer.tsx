import {
  AdminCreateUserMutationOptions,
  useAdminCreateUserMutation,
} from "@nham-avey/common"
import { Drawer } from "antd"
import UserForm, { UserFormSubmitValue } from "src/components/form/restaurant-form"

interface CreateUserDrawerProps {
  visible: boolean
  onCompleted: AdminCreateUserMutationOptions["onCompleted"]
  onClose: () => void
}

export function CreateUserDrawer({
  visible,
  onCompleted,
  onClose,
}: CreateUserDrawerProps) {
  const [create, { loading: isCreating }] = useAdminCreateUserMutation({
    onCompleted,
  })

  const onFinish = async (values: UserFormSubmitValue) => {
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
      title="Create User"
      className="max-w-full"
      contentWrapperStyle={{
        maxWidth: "100%",
      }}
    >
      <UserForm onSubmit={onFinish} isLoading={isCreating} />
    </Drawer>
  )
}

export default CreateUserDrawer
