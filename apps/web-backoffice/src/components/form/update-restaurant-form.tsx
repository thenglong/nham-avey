import React, { useCallback, useEffect, useMemo, useState } from "react"

import { LoadingOutlined, PlusOutlined } from "@ant-design/icons"
import {
  Restaurant,
  useAdminUpdateRestaurantMutation,
  useAdminGetUsersLazyQuery,
  useGetAllCategoriesQuery,
  User,
  UserRole,
} from "@nham-avey/common"
import { Button, Form, Input, Select, Upload, UploadFile } from "antd"
import ImgCrop from "antd-img-crop"
import { UploadChangeParam } from "antd/es/upload"
import { UploadProps } from "antd/es/upload/interface"
import { DebouncedSelect } from "src/components/form-elements/DebouncedSelect"
import { SelectOption } from "src/typing/common-type"
import { antUIUploadCustomRequest } from "src/utils/common-utils"

const { useForm } = Form

export interface RestaurantFormValue {
  name: string
  address: string
  vendors: SelectOption[]
  categories: SelectOption[]
}

export interface UpdateRestaurantFormProps {
  initialValue?: Restaurant | null
  onSubmit: ReturnType<typeof useAdminUpdateRestaurantMutation>[0]
  isLoading: boolean
}

export const UpdateRestaurantForm = ({
  initialValue,
  onSubmit,
  isLoading,
}: UpdateRestaurantFormProps) => {
  const [form] = useForm<RestaurantFormValue>()
  const [logoImageUrl, setLogoImageUrl] = useState<string>()
  const [coverImages, setCoverImages] = useState<UploadFile[]>([])
  const [isUploadingLogo, setIsUploadingLogo] = useState(false)
  const [isUploadingCover, setIsUploadingCover] = useState(false)

  useEffect(() => {
    if (initialValue) {
      form.setFieldsValue({
        ...initialValue,
        categories: initialValue.categories?.map(category => ({
          label: category.name,
          value: category.name,
        })),
        vendors: initialValue.vendors.map(vendor => ({
          label: vendor.email,
          value: vendor.id,
        })),
      })
      setLogoImageUrl(initialValue.logoImageUrl as string | undefined)
      setCoverImages(initialValue.coverImageUrls as [])
    }
  }, [form, initialValue])

  const handleLogoImageChange: UploadProps["onChange"] = (info: UploadChangeParam) => {
    if (info.file.status === "uploading") {
      setIsUploadingLogo(true)
      return
    }
    if (info.file.status === "done") {
      setIsUploadingLogo(false)
      setLogoImageUrl(info.file.response)
    }
  }

  const handleCoverImageChange: UploadProps["onChange"] = info => {
    setCoverImages(info.fileList)
    if (info.file.status === "uploading") {
      setIsUploadingCover(true)
      return
    }
    if (info.file.status === "done") {
      setIsUploadingCover(false)
      setLogoImageUrl(info.file.response)
    }
  }

  const [_, { refetch: getVendors }] = useAdminGetUsersLazyQuery()

  const fetchVendor = useCallback(
    async (search: string): Promise<SelectOption[]> => {
      const { data } = await getVendors({ take: 10, q: search, role: UserRole.Vendor })

      const { ok, users } = data?.adminGetUsers || {}
      if (ok && users) {
        return users.map((vendor: User) => ({
          label: vendor.email,
          value: vendor.id,
        }))
      }

      return []
    },
    [getVendors]
  )

  const { data: categoriesData } = useGetAllCategoriesQuery()

  const categoryOptions: SelectOption[] = useMemo(() => {
    return (
      categoriesData?.getAllCategories.categories?.map(category => ({
        label: category.name,
        value: category.name,
      })) || []
    )
  }, [categoriesData])

  const onFinish = async (values: RestaurantFormValue) => {
    const { name, address } = values
    try {
      const { data } = await onSubmit({
        variables: {
          input: {
            restaurantId: initialValue?.id as number,
            name,
            address,
            logoImageUrl,
            vendorIds: values.vendors.map(option => option.value.toString()),
            categories: values.categories.map(option => option.value.toString()),
            coverImageUrls: coverImages?.map(image => image.response),
          },
        },
      })
      if (data?.adminUpdateRestaurant.ok) {
        setLogoImageUrl("")
        setCoverImages([])
        form.resetFields()
      }
    } catch (e) {} // do nothing
  }

  return (
    <Form
      form={form}
      className="mt-3"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      onFinish={onFinish}
      autoComplete="off"
      name="update-restaurant"
    >
      <div className="text-center">
        <ImgCrop grid rotate quality={1} aspect={1}>
          <Upload
            listType="picture-card"
            className="mb-10"
            accept="image/*"
            showUploadList={false}
            customRequest={antUIUploadCustomRequest}
            onChange={handleLogoImageChange}
          >
            {isUploadingCover ? (
              <LoadingOutlined />
            ) : logoImageUrl ? (
              <img src={logoImageUrl} alt="avatar" style={{ width: "100%" }} />
            ) : (
              <div style={{ marginTop: 8 }}>
                <PlusOutlined />
              </div>
            )}
          </Upload>
        </ImgCrop>

        <ImgCrop grid rotate quality={1} aspect={16 / 9}>
          <Upload
            listType="picture-card"
            className="mb-10"
            accept="image/*"
            fileList={coverImages}
            showUploadList={true}
            customRequest={antUIUploadCustomRequest}
            onChange={handleCoverImageChange}
          >
            <div style={{ marginTop: 8 }}>
              <PlusOutlined />
            </div>
          </Upload>
        </ImgCrop>
      </div>

      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: "Please input name",
          },
        ]}
      >
        <Input className="w-full" />
      </Form.Item>

      <Form.Item
        label="Vendors"
        name="vendors"
        rules={[
          {
            required: true,
            message: "Please Select Vendors",
          },
        ]}
      >
        <DebouncedSelect mode="multiple" fetchOptions={fetchVendor} />
      </Form.Item>

      <Form.Item
        label="Categories"
        name="categories"
        rules={[
          {
            required: true,
            message: "Category is Required",
          },
        ]}
      >
        <Select
          mode="tags"
          showSearch
          labelInValue
          filterOption={true}
          options={categoryOptions}
        />
      </Form.Item>

      <Form.Item
        label="Address"
        name="address"
        rules={[
          {
            required: true,
            message: "Incorrect email format",
          },
        ]}
      >
        <Input className="w-full" autoComplete="off" />
      </Form.Item>

      <div className="text-right">
        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading}
          disabled={isUploadingCover || isUploadingLogo}
        >
          Save
        </Button>
      </div>
    </Form>
  )
}

export default UpdateRestaurantForm
