import React, { useEffect, useMemo, useState } from "react"

import { LoadingOutlined, PlusOutlined } from "@ant-design/icons"
import { User, UserRole } from "@nham-avey/common"
import { Button, Form, Input, Select, Upload } from "antd"
import ImgCrop from "antd-img-crop"
import { UploadChangeParam } from "antd/es/upload"
import { UploadProps } from "antd/es/upload/interface"
import { SelectOption } from "src/typing/common-type"
import { antUIUploadCustomRequest } from "src/utils/common-utils"

const { useForm } = Form

export interface UpdateUserFormValue {
  firstName: string | null
  lastName: string | null
  email: string
  isVerified: boolean
  roles: SelectOption[]
}

export interface UpdateUserFormSubmitValue {
  firstName: string | null
  lastName: string | null
  email: string
  isVerified: boolean
  photoURL: string | null
  roles: UserRole[]
}

export interface UpdateUserFormProps {
  initialValue?: User
  onSubmit: (values: UpdateUserFormSubmitValue) => Promise<void>
  isLoading: boolean
}

export const UpdateUserForm = ({
  initialValue,
  onSubmit,
  isLoading,
}: UpdateUserFormProps) => {
  const [form] = useForm<UpdateUserFormValue>()
  const [photoURL, setPhotoURL] = useState<string | null>(null)
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false)

  useEffect(() => {
    if (initialValue) {
      form.setFieldsValue({
        ...initialValue,
        roles: initialValue.roles.map(role => ({ label: role, value: role })),
      })
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

  const roleOptions: SelectOption[] = useMemo(
    () => [
      { label: UserRole.Admin, value: UserRole.Admin },
      { label: UserRole.Vendor, value: UserRole.Vendor },
      { label: UserRole.Driver, value: UserRole.Driver },
      { label: UserRole.Customer, value: UserRole.Customer },
    ],
    []
  )

  const onFinish = async (values: UpdateUserFormValue) => {
    await onSubmit({
      ...values,
      roles: values.roles.map(option => option.value as UserRole),
      photoURL,
    })
    setPhotoURL(null)
    form.resetFields()
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
            required: true,
            message: "Email is required!",
          },
        ]}
      >
        <Input className="w-full" />
      </Form.Item>

      <Form.Item
        label="Roles"
        name="roles"
        rules={[
          {
            required: true,
            message: "Role",
          },
        ]}
      >
        <Select mode="multiple" options={roleOptions} />
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

export default UpdateUserForm
