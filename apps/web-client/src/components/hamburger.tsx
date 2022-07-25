import React from "react"

import { motion, Transition, SVGMotionProps } from "framer-motion"

interface HamburgerButtonProps extends SVGMotionProps<any> {
  isOpen?: boolean
  color?: string
  strokeWidth?: string | number
  transition?: Transition
}

const Hamburger = ({
  isOpen = false,
  width = 18,
  height = 18,
  color = "#0B1521",
  transition,
  ...props
}: HamburgerButtonProps) => {
  const variant = isOpen ? "opened" : "closed"
  const top = {
    closed: {
      rotate: 0,
      translateY: 0,
    },
    opened: {
      rotate: 45,
      translateY: 2,
    },
  }
  const center = {
    closed: {
      opacity: 1,
    },
    opened: {
      opacity: 0,
    },
  }
  const bottom = {
    closed: {
      rotate: 0,
      translateY: 0,
    },
    opened: {
      rotate: -45,
      translateY: -1,
    },
  }
  const lineProps = {
    stroke: color,
    strokeWidth: 2,
    vectorEffect: "non-scaling-stroke",
    initial: "closed",
    animate: variant,
    transition,
  }

  const xFullLength = { x1: 0, x2: 4 }

  return (
    <motion.svg
      viewBox="0 0 4 4"
      overflow="visible"
      preserveAspectRatio="none"
      width={width}
      height={height}
      {...props}
    >
      <motion.line
        strokeLinecap="round"
        strokeLinejoin="round"
        x1="0"
        x2="4"
        y1="0"
        y2="0"
        variants={top}
        {...(isOpen && xFullLength)}
        {...lineProps}
      />
      <motion.line
        strokeLinecap="round"
        strokeLinejoin="round"
        x1="2"
        x2="4"
        y1="1.5"
        y2="1.5"
        variants={center}
        {...lineProps}
      />
      <motion.line
        strokeLinecap="round"
        strokeLinejoin="round"
        x1="1"
        x2="4"
        y1="3"
        y2="3"
        style={{ originX: "2px" }}
        variants={bottom}
        {...(isOpen && xFullLength)}
        {...lineProps}
      />
    </motion.svg>
  )
}

export { Hamburger }
