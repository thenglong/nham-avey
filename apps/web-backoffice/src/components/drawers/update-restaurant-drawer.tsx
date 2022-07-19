import React, { useCallback, useEffect, useState } from "react"

import { LoadingOutlined, PlusOutlined } from "@ant-design/icons"
import {
  AdminUpdateRestaurantMutationHookResult,
  Restaurant,
  useAdminGetUsersLazyQuery,
  UserRole,
  User,
} from "@nham-avey/common"
import { Button, Drawer, Form, Input, Typography, Upload } from "antd"
import ImgCrop from "antd-img-crop"
import type { UploadChangeParam } from "antd/es/upload"
import type { UploadProps } from "antd/es/upload/interface"
import { AxiosRequestConfig } from "axios"
import compressImage from "browser-image-compression"
import api from "src/api/_api"
import { CONTENT_TYPE_FORM_DATA } from "src/api/api-constants"
import {
  DebouncedSelect,
  OptionValue,
} from "src/components/form-elements/DebouncedSelect"

const { useForm } = Form

export interface UpdateRestaurantFormValue {
  name: string
  address: string
  vendor: OptionValue
}

interface UpdateRestaurantDrawerProps {
  restaurant: Restaurant | null
  visible: boolean
  onClose: () => void
  loading: boolean
  onSubmit: AdminUpdateRestaurantMutationHookResult[0]
  error: AdminUpdateRestaurantMutationHookResult[1]["error"]
}

export function UpdateRestaurantDrawer({
  restaurant,
  visible,
  onClose,
  loading,
  onSubmit,
  error,
}: UpdateRestaurantDrawerProps) {
  const [form] = useForm<UpdateRestaurantFormValue>()

  const customRequest: UploadProps["customRequest"] = async options => {
    const { onSuccess, onError, file, onProgress } = options

    const compressedFile = await compressImage(file as File, {
      maxWidthOrHeight: 1080,
      useWebWorker: true,
      maxSizeMB: 0.25,
    })

    const formData = new FormData()
    const config: AxiosRequestConfig = {
      headers: { "content-type": CONTENT_TYPE_FORM_DATA },
      onUploadProgress: event => {
        onProgress?.({ percent: (event.loaded / event.total) * 100 })
      },
    }
    formData.append("file", compressedFile)
    try {
      const res = await api.post("api/v1/upload", formData, config)

      onSuccess?.(res.data)
    } catch (err) {
      const error = new Error("Some error")
      onError?.(error)
    }
  }

  const [coverImageUrl, setCoverImageUrl] = useState<string>()
  const [isUploadingCoverImage, setIsUploadingCoverImage] = useState(false)

  const handleFileChange: UploadProps["onChange"] = (info: UploadChangeParam) => {
    if (info.file.status === "uploading") {
      setIsUploadingCoverImage(true)
      return
    }
    if (info.file.status === "done") {
      setIsUploadingCoverImage(false)
      setCoverImageUrl(info.file.response)
    }
  }

  useEffect(() => {
    if (restaurant) {
      form.setFieldsValue({
        ...restaurant,
        // TODO: use vendor name
        vendor: { value: restaurant.vendor.id, label: restaurant.vendor.email },
      })
      setCoverImageUrl(restaurant.coverImg)
    }
  }, [form, restaurant])

  const onFinish = async (values: UpdateRestaurantFormValue) => {
    await onSubmit({
      variables: {
        input: {
          name: values.name,
          address: values.address,
          restaurantId: restaurant?.id as number,
          coverImg: coverImageUrl,
          categoryName: restaurant?.category?.name,
          vendorId: restaurant?.vendor?.id,
        },
      },
      onCompleted: () => {
        onClose()
        setCoverImageUrl("")
        form.resetFields()
      },
    })
  }

  const [getVendors] = useAdminGetUsersLazyQuery()

  const fetchVendor = useCallback(
    async (search: string): Promise<OptionValue[]> => {
      const { data } = await getVendors({
        variables: { take: 10, q: search, role: UserRole.Vendor },
      })

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

  return (
    <Drawer
      width={500}
      placement="right"
      onClose={onClose}
      visible={visible}
      forceRender
      title="Update Restaurant"
      className="max-w-full"
      contentWrapperStyle={{
        maxWidth: "100%",
      }}
    >
      <Form
        form={form}
        className="mt-3 text-center"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        onFinish={onFinish}
        autoComplete="off"
        name="update-admin"
      >
        <ImgCrop grid rotate quality={1} aspect={16 / 9}>
          <Upload
            name="coverImg"
            listType="picture-card"
            className="mb-10"
            accept="image/*"
            showUploadList={false}
            customRequest={customRequest}
            onChange={handleFileChange}
          >
            {isUploadingCoverImage ? (
              <div>{isUploadingCoverImage ? <LoadingOutlined /> : <PlusOutlined />}</div>
            ) : coverImageUrl ? (
              <img src={coverImageUrl} alt="avatar" style={{ width: "100%" }} />
            ) : (
              <div style={{ marginTop: 8 }}>Upload</div>
            )}
          </Upload>
        </ImgCrop>

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
          label="Vendor"
          name="vendor"
          rules={[
            {
              required: true,
              message: "Please Select A Vendor",
            },
          ]}
        >
          <DebouncedSelect
            maxTagCount={1}
            maxLength={1}
            placeholder="Start Typing to Search"
            fetchOptions={fetchVendor}
            style={{ width: "100%" }}
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

        <Typography.Text type="danger">{error?.message}</Typography.Text>

        <div className="text-right">
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            disabled={isUploadingCoverImage}
          >
            Save
          </Button>
        </div>
      </Form>
    </Drawer>
  )
}

export default UpdateRestaurantDrawer
