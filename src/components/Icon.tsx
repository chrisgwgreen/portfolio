import React from 'react'
import styled, { css } from 'styled-components/macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  library,
  IconPrefix,
  SizeProp
} from '@fortawesome/fontawesome-svg-core'
import { IconPaddingOptions } from 'types'

import {
  faTimes,
  faBars,
  faChevronUp,
  faChevronDown,
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons'

export type IconName =
  | 'times'
  | 'bars'
  | 'chevron-up'
  | 'chevron-down'
  | 'chevron-left'
  | 'chevron-right'

interface Props {
  icon?: IconName
  padding?: IconPaddingOptions
  isCentre?: boolean
  isSpinning?: boolean
  prefix?: string
  size?: SizeProp
  isShadow?: boolean
}

library.add(
  faChevronUp,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faTimes,
  faBars
)

/*
 * Styled Components
 */
const IconWrapper = styled.div<{
  isCentre: boolean
  padding: IconPaddingOptions
}>((props) => {
  const { isCentre, padding } = props

  let paddingSize = '0.25rem'

  switch (padding) {
    case 'none':
      paddingSize = '0'
      break
    case 'small':
      paddingSize = '0.125rem'
      break
  }

  return css`
    margin-right: ${paddingSize};
    display: flex;
    pointer-events: none;
    align-items: center;

    ${isCentre &&
    css`
      position: absolute;
      left: 0;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      margin: auto;
    `}

    path {
      pointer-events: none;
      fill: inherit;
    }

    svg {
      pointer-events: none;
      left: 50%;
      transform: translateX(-50%);
      position: relative;
    }
  `
})

/*
 * Component
 */
export const Icon = (props: Props) => {
  const {
    icon = 'ghost',
    padding = 'none',
    isCentre = false,
    prefix = 'fas',
    size = '1x'
  } = props

  return (
    <IconWrapper padding={padding} isCentre={isCentre}>
      <FontAwesomeIcon
        size={size}
        icon={[prefix as IconPrefix, icon as IconName]}
        fixedWidth={true}
      />
    </IconWrapper>
  )
}
