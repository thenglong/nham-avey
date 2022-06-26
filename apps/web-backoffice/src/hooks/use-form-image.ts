import { ComponentProps, useState } from "react"

import type ImgCrop from "antd-img-crop"

const useFormImage = () => {
  const [photoImage, setPhotoImage] = useState<File | string | undefined>()
  const [previewUrl, setPreviewUrl] = useState("")

  const onImageChange: ComponentProps<typeof ImgCrop>["onModalOk"] = (
    result
  ) => {
    if (result instanceof File) {
      setPhotoImage(result)
      setPreviewUrl((previous) => {
        // clear previous preview from memory is exists
        if (previous) URL.revokeObjectURL(previous)
        return URL.createObjectURL(result)
      })
    }
  }

  return {
    photoImage,
    setPhotoImage,
    previewUrl,
    setPreviewUrl,
    onImageChange,
  }
}

export default useFormImage
