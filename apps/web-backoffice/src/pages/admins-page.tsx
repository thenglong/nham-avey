import { ChangeEventHandler, useCallback, useMemo, useState } from "react"

import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  ReloadOutlined,
  SearchOutlined,
} from "@ant-design/icons"
import {
  useAdminDeleteUserMutation,
  useAdminGetUsersQuery,
  User,
  UserRole,
} from "@nham-avey/common"
import {
  Button,
  Card,
  Input,
  Modal,
  notification,
  Table,
  TablePaginationConfig,
  Tooltip,
  Typography,
} from "antd"
import { ColumnsType } from "antd/lib/table/interface"
import { Helmet } from "react-helmet-async"
import AvatarInfo from "src/components/avatar-info"
import CreateAdminDrawer from "src/components/drawers/create-admin-drawer"
import UpdateUserDrawer from "src/components/drawers/update-user-drawer"
import { APP_NAME } from "src/config/app-config"
import { TableType } from "src/typing/common-type"
import { useDebouncedCallback } from "use-debounce"

const { confirm } = Modal

const PAGE_TITLE = `${APP_NAME} - Admins`

interface UserPageState {
  page: number
  take: number
  q: string
  role: UserRole
}

interface UserActionState {
  selectedUser: User | null
  createDrawerVisible: boolean
  updateDrawerViewVisible: boolean
  deleteConfirmationVisible: boolean
}

export const AdminsPage = () => {
  const [pageState, setPageState] = useState<UserPageState>({
    page: 1,
    take: 10,
    q: "",
    role: UserRole.Admin,
  })
  const [userActionState, setUserActionState] = useState<UserActionState>({
    selectedUser: null,
    createDrawerVisible: false,
    deleteConfirmationVisible: false,
    updateDrawerViewVisible: false,
  })
  const { data, loading, refetch } = useAdminGetUsersQuery({
    variables: pageState,
    fetchPolicy: "cache-and-network",
  })

  const openCreateDrawer = useCallback(() => {
    setUserActionState(prevState => ({
      ...prevState,
      createDrawerVisible: true,
    }))
  }, [])

  const closeCreateDrawer = useCallback(() => {
    setUserActionState(userActionState => ({
      ...userActionState,
      selectedUser: null,
      createDrawerVisible: false,
    }))
  }, [])

  const openUpdateDrawer = useCallback((restaurant: User) => {
    setUserActionState(userActionState => ({
      ...userActionState,
      selectedUser: restaurant,
      updateDrawerViewVisible: true,
    }))
  }, [])

  const closeUpdateDrawer = useCallback(() => {
    setUserActionState(userActionState => ({
      ...userActionState,
      selectedUser: null,
      updateDrawerViewVisible: false,
    }))
  }, [])

  const [deleteUser] = useAdminDeleteUserMutation({
    onCompleted: async () => {
      notification.success({
        message: "Success",
        description: "User deleted successfully",
        placement: "bottomLeft",
      })
      await refetch(pageState)
      setUserActionState(prevState => ({
        ...prevState,
        deleteConfirmationVisible: false,
      }))
    },
  })

  const tableColumns = useMemo<ColumnsType<User>>(
    () => [
      {
        title: "Basic Info",
        render: (_, user) => (
          <AvatarInfo
            photoUrl={user.photoURL as string}
            blurhash=""
            title={`${user.firstName ?? ""} ${user.lastName ?? ""}`}
            subTitle={user.email}
          />
        ),
      },
      {
        title: "Actions",
        render: (_, user) => {
          return (
            <div className="flex flex-wrap gap-1">
              <Tooltip title="Update" zIndex={999}>
                <Button
                  icon={<EditOutlined />}
                  onClick={() => openUpdateDrawer(user)}
                  size="middle"
                />
              </Tooltip>
              <Tooltip title="Delete" zIndex={999}>
                <Button
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => {
                    confirm({
                      title: `Do you want to delete ${user.firstName || "this User"}?`,
                      icon: <ExclamationCircleOutlined />,
                      content: "",
                      onOk: async () =>
                        await deleteUser({
                          variables: { userId: user.id },
                        }),
                    })
                  }}
                  size="middle"
                />
              </Tooltip>
            </div>
          )
        },
      },
    ],
    [deleteUser, openUpdateDrawer]
  )

  const pagination: TablePaginationConfig = useMemo(() => {
    return {
      current: pageState.page,
      pageSize: pageState.take,
      total: data?.adminGetUsers.matchedCount || 0,
      showSizeChanger: true,
      onChange: (page, pageSize) => {
        if (pageSize !== pageState.take) {
          setPageState({
            ...pageState,
            take: pageSize,
            page: 1,
          })
        } else {
          setPageState({
            ...pageState,
            page,
          })
        }
      },
    }
  }, [pageState, data, setPageState])

  const setDebouncedPageState = useDebouncedCallback(setPageState, 300)

  const onSearch: ChangeEventHandler<HTMLInputElement> = evt => {
    setDebouncedPageState({
      ...pageState,
      page: 1,
      q: evt.target.value,
    })
  }

  return (
    <div className="flex h-full flex-col">
      <Typography.Title>Admins</Typography.Title>
      <Card bodyStyle={{ padding: "0px", height: "100%" }} className="h-full">
        <Helmet title={PAGE_TITLE} />
        <div className="h-full">
          <div className="flex gap-2 px-4 py-8">
            <div className="flex">
              <Input
                className="w-40 md:w-80"
                placeholder="Search"
                prefix={<SearchOutlined />}
                onChange={onSearch}
              />
              <Tooltip title="Reload">
                <Button
                  type="primary"
                  onClick={() => refetch(pageState)}
                  icon={<ReloadOutlined />}
                />
              </Tooltip>
            </div>

            {/* grow fill the full width */}
            <div className="grow" aria-hidden />

            <Button type="primary" onClick={openCreateDrawer} className="min-w-[6rem]">
              New
            </Button>
          </div>

          <Table<TableType<User>>
            className="overflow-x-auto"
            columns={tableColumns}
            dataSource={data?.adminGetUsers.users || []}
            rowKey="id"
            pagination={pagination}
            loading={loading}
          />
        </div>
        <CreateAdminDrawer
          visible={userActionState.createDrawerVisible}
          onClose={closeCreateDrawer}
          onCompleted={() => {
            closeCreateDrawer()
            refetch(pageState)
          }}
        />
        <UpdateUserDrawer
          visible={userActionState.updateDrawerViewVisible}
          user={userActionState.selectedUser as User}
          onClose={closeUpdateDrawer}
          onCompleted={() => {
            closeUpdateDrawer()
            refetch(pageState)
          }}
        />
      </Card>
    </div>
  )
}

export default AdminsPage
