import { CreateAdminMutationOptions, useCreateAdminMutation } from "@nham-avey/common"
import { Drawer } from "antd"
import UserForm, { UserFormSubmitValue } from "src/components/form/user-form"

interface CreateAdminDrawerProps {
  visible: boolean
  onCompleted: CreateAdminMutationOptions["onCompleted"]
  onClose: () => void
}

export function CreateAdminDrawer({
  visible,
  onCompleted,
  onClose,
}: CreateAdminDrawerProps) {
  const [create, { loading: isCreating }] = useCreateAdminMutation({
    onCompleted,
  })

  const onFinish = async (values: UserFormSubmitValue) => {
    const { lastName, isVerified, roles, firstName, photoURL, email } = values
    try {
      await create({
        variables: {
          input: {
            lastName,
            isVerified,
            roles,
            firstName,
            photoURL,
            email,
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
      <UserForm onSubmit={onFinish} isLoading={isCreating} />
    </Drawer>
  )
}

export default CreateAdminDrawer
