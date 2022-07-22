import { ChangeEventHandler, useCallback, useMemo, useState } from "react"

import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  ReloadOutlined,
  SearchOutlined,
} from "@ant-design/icons"
import {
  Category,
  Restaurant,
  useAdminGetRestaurantsQuery,
  useDeleteRestaurantMutation,
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
  Typography,
} from "antd"
import { ColumnsType } from "antd/lib/table/interface"
import moment from "moment"
import { Helmet } from "react-helmet-async"
import AvatarInfo from "src/components/avatar-info"
import CreateRestaurantDrawer from "src/components/drawers/create-restaurant-drawer"
import UpdateRestaurantDrawer from "src/components/drawers/update-restaurant-drawer"
import { APP_NAME } from "src/config/app-config"
import { TableType } from "src/typing/common-type"
import { useDebouncedCallback } from "use-debounce"

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
            photoUrl={restaurant.logoImageUrl as string}
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
            <Tag color="blue" key={category.id} className="mb-2">
              {category.name}
            </Tag>
          )),
      },
      {
        title: "Vendor Info(Showing 1)",
        render: (_, restaurant) => {
          const firstVendor = restaurant.vendors[0]
          if (!firstVendor) return <Tag color="error">No Vendor</Tag>
          return (
            <AvatarInfo
              photoUrl={firstVendor.photoURL as string}
              blurhash=""
              title={restaurant?.vendors[0]?.email}
              subTitle={moment(new Date(restaurant.vendors?.[0]?.createdAt)).format(
                "Do MMM YYYY"
              )}
            />
          )
        },
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
      <Typography.Title>Restaurants</Typography.Title>
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

          <Table<TableType<Restaurant>>
            className="overflow-x-auto"
            columns={tableColumns}
            dataSource={data?.adminGetRestaurants.restaurants || []}
            rowKey="id"
            pagination={pagination}
            loading={loading}
          />
        </div>
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
    </div>
  )
}

export default RestaurantsPage
