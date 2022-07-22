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
  useAdminDeleteCategoryMutation,
  useGetCategoriesQuery,
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
import CreateCategoryDrawer from "src/components/drawers/create-category-drawer"
import UpdateCategoryDrawer from "src/components/drawers/update-category-drawer"
import { APP_NAME } from "src/config/app-config"
import { TableType } from "src/typing/common-type"
import { useDebouncedCallback } from "use-debounce"

const { confirm } = Modal

const PAGE_TITLE = `${APP_NAME} - Categories`

interface CategoryPageState {
  page: number
  take: number
  q: string
}

interface UserActionState {
  selectedCategory: Category | null
  createDrawerVisible: boolean
  updateDrawerViewVisible: boolean
  deleteConfirmationVisible: boolean
}

export const CategoriesPage = () => {
  const [pageState, setPageState] = useState<CategoryPageState>({
    page: 1,
    take: 10,
    q: "",
  })
  const [userActionState, setUserActionState] = useState<UserActionState>({
    selectedCategory: null,
    createDrawerVisible: false,
    deleteConfirmationVisible: false,
    updateDrawerViewVisible: false,
  })
  const { data, loading, refetch } = useGetCategoriesQuery({
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
      selectedCategory: null,
      createDrawerVisible: false,
    }))
  }, [])

  const openUpdateDrawer = useCallback((category: Category) => {
    setUserActionState(userActionState => ({
      ...userActionState,
      selectedCategory: category,
      updateDrawerViewVisible: true,
    }))
  }, [])

  const closeUpdateDrawer = useCallback(() => {
    setUserActionState(userActionState => ({
      ...userActionState,
      selectedCategory: null,
      updateDrawerViewVisible: false,
    }))
  }, [])

  const [deleteCategory] = useAdminDeleteCategoryMutation({
    onCompleted: async () => {
      notification.success({
        message: "Success",
        description: "Category deleted successfully",
        placement: "bottomLeft",
      })
      await refetch(pageState)
      setUserActionState(prevState => ({
        ...prevState,
        deleteConfirmationVisible: false,
      }))
    },
  })

  const tableColumns = useMemo<ColumnsType<Category>>(
    () => [
      {
        title: "Basic Info",
        render: (_, category) => (
          <AvatarInfo
            photoUrl={category.coverImageUrl as string}
            blurhash=""
            title={category.name}
            subTitle={`Total Restaurants: ${category.restaurantCount}`}
          />
        ),
      },
      {
        title: "Actions",
        render: (_, category) => {
          return (
            <div className="flex flex-wrap gap-1">
              <Tooltip title="Update" zIndex={999}>
                <Button
                  icon={<EditOutlined />}
                  onClick={() => openUpdateDrawer(category)}
                  size="middle"
                />
              </Tooltip>
              <Tooltip title="Delete" zIndex={999}>
                <Button
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => {
                    confirm({
                      title: `Do you want to delete ${category.name}?`,
                      icon: <ExclamationCircleOutlined />,
                      content: "",
                      onOk: async () =>
                        await deleteCategory({
                          variables: { categoryId: category.id },
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
    [deleteCategory, openUpdateDrawer]
  )

  const pagination: TablePaginationConfig = useMemo(() => {
    return {
      current: pageState.page,
      pageSize: pageState.take,
      total: data?.getCategories.matchedCount || 0,
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
      <Typography.Title>Categories</Typography.Title>
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

          <Table<TableType<Category>>
            className="overflow-x-auto"
            columns={tableColumns}
            dataSource={data?.getCategories.categories || []}
            rowKey="id"
            pagination={pagination}
            loading={loading}
          />
        </div>
        <CreateCategoryDrawer
          visible={userActionState.createDrawerVisible}
          onClose={closeCreateDrawer}
          onCompleted={() => {
            closeCreateDrawer()
            refetch(pageState)
          }}
        />
        <UpdateCategoryDrawer
          visible={userActionState.updateDrawerViewVisible}
          category={userActionState.selectedCategory}
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

export default CategoriesPage
