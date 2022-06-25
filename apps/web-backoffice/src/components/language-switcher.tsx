/* eslint-disable */
import { useCallback, useRef, useState } from "react"
import { Tooltip, Button, Select } from "antd"
import { SearchOutlined } from "@ant-design/icons"
import { useTranslation } from "react-i18next"

import { ReactComponent as KHFlag } from "src/assets/svgs/country-flags/KH.svg"
import { ReactComponent as USFlag } from "src/assets/svgs/country-flags/US.svg"
import internationalization from "src/i18n/i18n"

const { Option } = Select

const LanguageSwitcher = () => {
  const {
    i18n: { language },
  } = useTranslation()
  const { t } = useTranslation()

  const switchLanguage = ({ lng }: { lng: string }) => {
    internationalization.changeLanguage(lng)
  }

  const ref = useRef(null)
  const [isOpen, setOpen] = useState(false)

  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  const isEnglish = language === "en" || language === "en-US" || language === "en-GB"
  const isKhmer = language === "km" || language === "km-KH"

  return (
    <Select suffixIcon={<SearchOutlined />} defaultValue={1} style={{ width: 200 }}>
      <Option value={1}>Item 1</Option>
      <Option value={2}>Item 2</Option>
    </Select>
  )
}

export default LanguageSwitcher
