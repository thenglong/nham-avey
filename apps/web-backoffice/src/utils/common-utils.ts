import { UploadProps } from "antd/es/upload/interface"
import { AxiosRequestConfig } from "axios"
import compressImage from "browser-image-compression"
import api from "src/api/_api"
import { CONTENT_TYPE_FORM_DATA } from "src/api/api-constants"

export const antUIUploadCustomRequest: UploadProps["customRequest"] = async options => {
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
