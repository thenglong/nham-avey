import React, { useState } from "react"

import { LoadingOutlined, PlusOutlined } from "@ant-design/icons"
import { useAdminCreateCategoryMutation } from "@nham-avey/common"
import { Button, Form, Input, Upload } from "antd"
import ImgCrop from "antd-img-crop"
import { UploadChangeParam } from "antd/es/upload"
import { UploadProps } from "antd/es/upload/interface"
import { antUIUploadCustomRequest } from "src/utils/common-utils"

const { useForm } = Form

export interface CreateCategoryFormValue {
  name: string
}

export interface CreateCategoryFormProps {
  onSubmit: ReturnType<typeof useAdminCreateCategoryMutation>[0]
  isLoading: boolean
}

export const CreateCategoryForm = ({ onSubmit, isLoading }: CreateCategoryFormProps) => {
  const [form] = useForm<CreateCategoryFormValue>()
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null)
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false)

  const handleCoverImageChange: UploadProps["onChange"] = (info: UploadChangeParam) => {
    if (info.file.status === "uploading") {
      setIsUploadingPhoto(true)
      return
    }
    if (info.file.status === "done") {
      setIsUploadingPhoto(false)
      setCoverImageUrl(info.file.response)
    }
  }

  const onFinish = async (values: CreateCategoryFormValue) => {
    const { name } = values
    try {
      const { data } = await onSubmit({
        variables: {
          input: {
            name,
            coverImageUrl,
          },
        },
      })
      if (data?.adminCreateCategory.ok) {
        setCoverImageUrl(null)
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
      name="user-form"
    >
      <div className="text-center">
        <ImgCrop grid rotate quality={1} aspect={1}>
          <Upload
            listType="picture-card"
            className="mb-10"
            accept="image/*"
            showUploadList={false}
            customRequest={antUIUploadCustomRequest}
            onChange={handleCoverImageChange}
          >
            {isUploadingPhoto ? (
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
          disabled={isUploadingPhoto}
        >
          Save
        </Button>
      </div>
    </Form>
  )
}

export default CreateCategoryForm
