import { useCallback, useMemo, useState } from "react"

import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons"
import {
  Restaurant,
  useAdminGetRestaurantsQuery,
  useDeleteRestaurantMutation,
  useAdminCreateRestaurantMutation,
  useAdminUpdateRestaurantMutation,
} from "@nham-avey/common"
import {
  Button,
  Card,
  Modal,
  notification,
  Table,
  TablePaginationConfig,
  Tooltip,
  Input,
} from "antd"
import { ColumnsType } from "antd/lib/table/interface"
import moment from "moment"
import { Helmet } from "react-helmet-async"
import AvatarInfo from "src/components/avatar-info"
import UpdateRestaurantDrawer from "src/components/drawers/update-restaurant-drawer"
import { APP_NAME } from "src/config/app-config"
import { TableType } from "src/typing/common-type"

// import CreateRestaurantView from "./create-admin-view"
// import UpdateRestaurantView from "./update-admin-view"

const { confirm } = Modal

const PAGE_TITLE = `${APP_NAME} - Restaurants`

interface RestaurantPageState {
  page: number
  take: number
  q: string
}

interface UserActionState {
  selectedRestaurant: Restaurant | null
  createRestaurantViewVisible: boolean
  updateRestaurantViewVisible: boolean
  deleteConfirmationVisible: boolean
}

export const RestaurantsPage = () => {
  const [pageState, setPageState] = useState<RestaurantPageState>({
    page: 1,
    take: 10,
    q: "",
  })
  const [userActionState, setUserActionState] = useState<UserActionState>({
    selectedRestaurant: null,
    createRestaurantViewVisible: false,
    deleteConfirmationVisible: false,
    updateRestaurantViewVisible: false,
  })
  const { data, loading, refetch } = useAdminGetRestaurantsQuery({
    variables: pageState,
    fetchPolicy: "cache-and-network",
  })

  const [create] = useAdminCreateRestaurantMutation({
    onCompleted: () => refetch(pageState),
  })
  const [update, { loading: isUpdating, error: updateError }] =
    useAdminUpdateRestaurantMutation({
      onCompleted: () => refetch(pageState),
    })
  const onOpenCreateView = useCallback((restaurant: Restaurant) => {
    setUserActionState(prevState => ({
      ...prevState,
      selectedRestaurant: restaurant,
      updateRestaurantViewVisible: true,
    }))
  }, [])

  const [deleteRestaurant] = useDeleteRestaurantMutation({
    onCompleted: async () => {
      notification.success({
        message: "Success",
        description: "Restaurant deleted successfully",
        placement: "bottomLeft",
      })
      await refetch(pageState)
      setUserActionState(prevState => ({
        ...prevState,
        deleteConfirmationVisible: false,
      }))
    },
  })

  const tableColumns = useMemo<ColumnsType<Restaurant>>(
    () => [
      {
        title: "Basic Info",
        render: (_, restaurant) => (
          <AvatarInfo
            photoUrl={restaurant.coverImg}
            blurhash=""
            title={restaurant.name}
            subTitle={restaurant.address}
          />
        ),
      },
      {
        title: "Vendor Info",
        render: (_, restaurant) => (
          <AvatarInfo
            photoUrl={`https://i.pravatar.cc/150?u=${Math.random()}`}
            blurhash=""
            title={restaurant.vendor.email}
            subTitle={moment(new Date(restaurant.vendor.createdAt)).format("Do MMM YYYY")}
          />
        ),
      },
      {
        title: "Action",
        render: (_, restaurant) => {
          return (
            <div className="flex flex-wrap gap-1">
              <Tooltip title="Update" zIndex={999}>
                <Button
                  icon={<EditOutlined />}
                  onClick={() => onOpenCreateView(restaurant)}
                  size="middle"
                />
              </Tooltip>
              <Tooltip title="Delete" zIndex={999}>
                <Button
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => {
                    confirm({
                      title: `Do you want to delete ${restaurant.name}?`,
                      icon: <ExclamationCircleOutlined />,
                      content: "",
                      onOk: async () =>
                        await deleteRestaurant({
                          variables: { restaurantId: restaurant.id },
                        }),
                      onCancel: undefined,
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
    [deleteRestaurant, onOpenCreateView]
  )

  const pagination: TablePaginationConfig = useMemo(() => {
    return {
      current: pageState.page,
      pageSize: pageState.take,
      total: data?.adminGetRestaurants.matchedCount || 0,
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

  const openCreateDrawer = useCallback(() => {
    setUserActionState(userActionState => ({
      ...userActionState,
      createRestaurantViewVisible: true,
    }))
  }, [])

  const closeCreateDrawer = useCallback(() => {
    setUserActionState(userActionState => ({
      ...userActionState,
      createRestaurantViewVisible: false,
    }))
  }, [])

  const openUpdateDrawer = useCallback(() => {
    setUserActionState(userActionState => ({
      ...userActionState,
      updateRestaurantViewVisible: true,
    }))
  }, [])

  const closeUpdateDrawer = useCallback(() => {
    setUserActionState(userActionState => ({
      ...userActionState,
      updateRestaurantViewVisible: false,
    }))
  }, [])

  return (
    <Card bodyStyle={{ padding: "0px" }}>
      <Helmet title={PAGE_TITLE} />
      <div className="mb-1">
        <div className="flex gap-2 px-4 py-8">
          <Input
            className="w-80"
            placeholder="Search"
            prefix={<SearchOutlined />}
            // onChange={onSearch}
          />

          {/* grow fill the full width */}
          <div className="grow" aria-hidden />

          <Button
            type="primary"
            // onClick={openCreateRestaurantView}
            // disabled={isLoading || isCreatingRestaurant}
          >
            Create New
          </Button>
        </div>

        <Table<TableType<Restaurant>>
          columns={tableColumns}
          dataSource={data?.adminGetRestaurants.restaurants || []}
          rowKey="id"
          pagination={pagination}
          loading={loading}
        />
      </div>
      {/*<CreateRestaurantView*/}
      {/*  visible={userActionState.createRestaurantViewVisible}*/}
      {/*  close={closeCreateRestaurantView}*/}
      {/*  loading={isCreatingRestaurant}*/}
      {/*  onSubmit={createRestaurant}*/}
      {/*  error={createRestaurantError}*/}
      {/*/>*/}
      <UpdateRestaurantDrawer
        visible={userActionState.updateRestaurantViewVisible}
        onClose={closeUpdateDrawer}
        loading={isUpdating}
        restaurant={userActionState.selectedRestaurant}
        error={updateError}
        onSubmit={update}
      />
    </Card>
  )
}

export default RestaurantsPage
