import React, { useEffect, useState } from "react"

import { LoadingOutlined, PlusOutlined } from "@ant-design/icons"
import { useAdminCreateAdminMutation, User } from "@nham-avey/common"
import { Button, Form, Input, Upload } from "antd"
import ImgCrop from "antd-img-crop"
import { UploadChangeParam } from "antd/es/upload"
import { UploadProps } from "antd/es/upload/interface"
import { antUIUploadCustomRequest } from "src/utils/common-utils"

const { useForm } = Form

export interface CreateAdminFormValue {
  firstName: string | null
  lastName: string | null
  email: string
}

export interface CreateAdminFormProps {
  initialValue?: User
  onSubmit: ReturnType<typeof useAdminCreateAdminMutation>[0]
  isLoading: boolean
}

export const CreateAdminForm = ({
  initialValue,
  onSubmit,
  isLoading,
}: CreateAdminFormProps) => {
  const [form] = useForm<CreateAdminFormValue>()
  const [photoURL, setPhotoURL] = useState<string | null>(null)
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false)

  useEffect(() => {
    if (initialValue) {
      form.setFieldsValue(initialValue)
      setPhotoURL(initialValue.photoURL as string | null)
    }
  }, [form, initialValue])

  const handleLogoImageChange: UploadProps["onChange"] = (info: UploadChangeParam) => {
    if (info.file.status === "uploading") {
      setIsUploadingPhoto(true)
      return
    }
    if (info.file.status === "done") {
      setIsUploadingPhoto(false)
      setPhotoURL(info.file.response)
    }
  }

  const onFinish = async (values: CreateAdminFormValue) => {
    const { lastName, firstName, email } = values
    try {
      const { data } = await onSubmit({
        variables: {
          input: {
            email,
            lastName,
            firstName,
            photoURL,
          },
        },
      })
      if (data?.adminCreateAdmin.ok) {
        setPhotoURL(null)
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
            onChange={handleLogoImageChange}
          >
            {isUploadingPhoto ? (
              <LoadingOutlined />
            ) : photoURL ? (
              <img src={photoURL} alt="avatar" style={{ width: "100%" }} />
            ) : (
              <div style={{ marginTop: 8 }}>
                <PlusOutlined />
              </div>
            )}
          </Upload>
        </ImgCrop>
      </div>

      <Form.Item
        label="First Name"
        name="firstName"
        rules={[
          {
            required: true,
            message: "First Name is required!",
          },
        ]}
      >
        <Input className="w-full" />
      </Form.Item>

      <Form.Item
        label="Last Name"
        name="lastName"
        rules={[
          {
            required: true,
            message: "Last Name is required!",
          },
        ]}
      >
        <Input className="w-full" />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
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

export default CreateAdminForm
