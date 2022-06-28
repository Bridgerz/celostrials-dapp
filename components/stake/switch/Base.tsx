import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { css, cx } from "@emotion/css"

export type SwitchSize = "small" | "medium" | "large"

export type SwitchProps = {
  on?: boolean
  activeColor?: React.CSSProperties["color"]
  trackColor?: React.CSSProperties["color"]
  size?: SwitchSize
  onChange?: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
  textDirection?: "ltr" | "rtl"
}

type BaseSwitchProps = {
  icon?: React.ReactNode

  trackCss?: string
  thumbCss?: string

  trackClassName?: string
  thumbClassName?: string

  enableLabels?: boolean
  onLabelText?: string
  offLabelText?: string

  labelsWrapperCss?: string
  labelsWrapperClassName?: string

  onLabelCss?: string
  offLabelCss?: string
  onLabelClassName?: string
  offLabelClassName?: string

  animationDuration?: number
  animationType?: "spring" // @todo: Offer more types

  startAnimationX?: number
  endAnimationX?: number
}

const disabledOpacity = 0.5

const defaultLabelsWrapperCss = `
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Base: React.FC<BaseSwitchProps & SwitchProps> = ({
  on = false,
  icon,
  onChange,
  trackCss,
  thumbCss,
  trackClassName,
  thumbClassName,
  labelsWrapperCss = defaultLabelsWrapperCss,
  labelsWrapperClassName,
  onLabelCss,
  offLabelCss,
  onLabelClassName,
  offLabelClassName,
  animationDuration = 0.3,
  animationType = "spring",
  startAnimationX = 0,
  endAnimationX = 0,
  enableLabels = false,
  onLabelText = "On",
  offLabelText = "Off",
}) => {
  const [animateX, setAnimateX] = useState(startAnimationX)
  const disabled = !Boolean(onChange)

  useEffect(() => {
    setAnimateX(on ? endAnimationX : startAnimationX)
  }, [on, endAnimationX, startAnimationX])

  return (
    <motion.span
      onClick={onChange}
      className={cx(
        css({
          position: "relative",
          cursor: "pointer",
          opacity: disabled ? disabledOpacity : "none",
          trackClassName,
        }),
        css(trackCss)
      )}
    >
      {enableLabels && (
        <span className={cx(css(labelsWrapperCss), labelsWrapperClassName)}>
          <span className={cx(css(onLabelCss), onLabelClassName)}>
            {onLabelText}
          </span>
          <span className={cx(css(offLabelCss), offLabelClassName)}>
            {offLabelText}
          </span>
        </span>
      )}
      <motion.span
        initial={{ x: animateX }}
        animate={{ x: animateX }}
        transition={{ duration: animationDuration, type: animationType }}
        className={cx(css(thumbCss), thumbClassName)}
      >
        {icon}
      </motion.span>
    </motion.span>
  )
}
