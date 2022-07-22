import React, { useEffect, useState } from "react"

import { LoadingOutlined, PlusOutlined } from "@ant-design/icons"
import { Category, useAdminUpdateCategoryMutation } from "@nham-avey/common"
import { Button, Form, Input, Upload } from "antd"
import ImgCrop from "antd-img-crop"
import { UploadChangeParam } from "antd/es/upload"
import { UploadProps } from "antd/es/upload/interface"
import { antUIUploadCustomRequest } from "src/utils/common-utils"

const { useForm } = Form

export interface UpdateCategoryFormValue {
  name: string
}

export interface UpdateCategoryFormProps {
  initialValue: Category | null
  onSubmit: ReturnType<typeof useAdminUpdateCategoryMutation>[0]
  isLoading: boolean
}

export const UpdateCategoryForm = ({
  initialValue,
  onSubmit,
  isLoading,
}: UpdateCategoryFormProps) => {
  const [form] = useForm<UpdateCategoryFormValue>()
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null)
  const [isUploadingCover, setIsUploadingCover] = useState(false)

  useEffect(() => {
    if (initialValue) {
      form.setFieldsValue({
        ...initialValue,
      })
      setCoverImageUrl(initialValue.coverImageUrl as string | null)
    }
  }, [form, initialValue])

  const handleLogoImageChange: UploadProps["onChange"] = (info: UploadChangeParam) => {
    if (info.file.status === "uploading") {
      setIsUploadingCover(true)
      return
    }
    if (info.file.status === "done") {
      setIsUploadingCover(false)
      setCoverImageUrl(info.file.response)
    }
  }

  const onFinish = async (values: UpdateCategoryFormValue) => {
    const { name } = values
    const { data } = await onSubmit({
      variables: {
        input: {
          categoryId: initialValue?.id as number,
          name,
          coverImageUrl,
        },
      },
    })
    if (data?.adminUpdateCategory.ok) {
      setCoverImageUrl(null)
      form.resetFields()
    }
  }

  return (
    <Form
      form={form}
      className="mt-3"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      onFinish={onFinish}
      autoComplete="off"
      name="update-user-form"
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
            ) : coverImageUrl ? (
              <img src={coverImageUrl} alt="avatar" style={{ width: "100%" }} />
            ) : (
              <div style={{ marginTop: 8 }}>
                <PlusOutlined />
              </div>
            )}
          </Upload>
        </ImgCrop>
      </div>

      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: "Name is required!",
          },
        ]}
      >
        <Input className="w-full" />
      </Form.Item>

      <div className="text-right">
        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading}
          disabled={isUploadingCover}
        >
          Save
        </Button>
      </div>
    </Form>
  )
}

export default UpdateCategoryForm
