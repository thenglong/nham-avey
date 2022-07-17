import { LoadingOutlined } from "@ant-design/icons"
import { Spin } from "antd"
import clsx from "clsx"

interface LoadingProps {
  align?: "left" | "right" | "center"
  cover?: "content" | "page"
}

const LoadingIndicator = ({ align, cover }: LoadingProps) => {
  return (
    <div
      className={clsx("loading", {
        "text-left": align === "left",
        "text-right": align === "right",
        "text-center": align === "center",
        "absolute left-1/2 top-1/2 translate-y-1/2 translate-x-1/2	": cover === "content",
        "fixed flex h-full w-full items-center justify-center": cover === "page",
      })}
    >
      <Spin indicator={<LoadingOutlined style={{ fontSize: 35 }} spin />} />
    </div>
  )
}

export default LoadingIndicator
