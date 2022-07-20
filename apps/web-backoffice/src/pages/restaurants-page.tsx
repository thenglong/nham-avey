import { useCallback, useMemo, useState } from "react"

import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons"
import {
  Restaurant,
  useAdminCreateRestaurantMutation,
  useAdminGetRestaurantsQuery,
  useDeleteRestaurantMutation,
  Category,
} from "@nham-avey/common"
import {
  Button,
  Card,
  Input,
  Modal,
  notification,
  Table,
  TablePaginationConfig,
  Tag,
  Tooltip,
} from "antd"
import { ColumnsType } from "antd/lib/table/interface"
import moment from "moment"
import { Helmet } from "react-helmet-async"
import AvatarInfo from "src/components/avatar-info"
import CreateRestaurantDrawer from "src/components/drawers/create-restaurant-drawer"
import UpdateRestaurantDrawer from "src/components/drawers/update-restaurant-drawer"
import { APP_NAME } from "src/config/app-config"
import { TableType } from "src/typing/common-type"

const { confirm } = Modal

const PAGE_TITLE = `${APP_NAME} - Restaurants`

interface RestaurantPageState {
  page: number
  take: number
  q: string
}

interface UserActionState {
  selectedRestaurant: Restaurant | null
  createDrawerVisible: boolean
  updateDrawerViewVisible: boolean
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
    createDrawerVisible: false,
    deleteConfirmationVisible: false,
    updateDrawerViewVisible: false,
  })
  const { data, loading, refetch } = useAdminGetRestaurantsQuery({
    variables: pageState,
    fetchPolicy: "cache-and-network",
  })

  const [create] = useAdminCreateRestaurantMutation({
    onCompleted: () => refetch(pageState),
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
      selectedRestaurant: null,
      createDrawerVisible: false,
    }))
  }, [])

  const openUpdateDrawer = useCallback((restaurant: Restaurant) => {
    setUserActionState(userActionState => ({
      ...userActionState,
      selectedRestaurant: restaurant,
      updateDrawerViewVisible: true,
    }))
  }, [])

  const closeUpdateDrawer = useCallback(() => {
    setUserActionState(userActionState => ({
      ...userActionState,
      selectedRestaurant: null,
      updateDrawerViewVisible: false,
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
        title: "Categories",
        render: (_, restaurant) =>
          restaurant.categories?.map((category: Category) => (
            <Tag color="blue" key={category.id} className="mb-1">
              {category.name}
            </Tag>
          )),
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
        title: "Actions",
        render: (_, restaurant) => {
          return (
            <div className="flex flex-wrap gap-1">
              <Tooltip title="Update" zIndex={999}>
                <Button
                  icon={<EditOutlined />}
                  onClick={() => openUpdateDrawer(restaurant)}
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
    [deleteRestaurant, openUpdateDrawer]
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

          <Button type="primary" onClick={openCreateDrawer}>
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
      <CreateRestaurantDrawer
        visible={userActionState.createDrawerVisible}
        onClose={closeCreateDrawer}
        onCompleted={() => {
          closeCreateDrawer()
          refetch(pageState)
        }}
      />
      <UpdateRestaurantDrawer
        visible={userActionState.updateDrawerViewVisible}
        restaurant={userActionState.selectedRestaurant}
        onClose={closeUpdateDrawer}
        onCompleted={() => {
          closeUpdateDrawer()
          refetch(pageState)
        }}
      />
    </Card>
  )
}

export default RestaurantsPage
