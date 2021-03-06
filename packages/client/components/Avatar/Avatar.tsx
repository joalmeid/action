import React, {forwardRef} from 'react'
import AvatarBadge from '../AvatarBadge/AvatarBadge'
import styled from '@emotion/styled'

type ImageBlockProps = Pick<Props, 'sansRadius' | 'sansShadow' | 'picture' | 'size' | 'onClick'>

const ImageBlock = styled('div')<ImageBlockProps>(
  ({sansRadius, sansShadow, picture, size, onClick}) => ({
    backgroundImage: `url(${picture})`,
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    borderRadius: sansRadius ? 0 : '100%',
    boxShadow: sansShadow ? 'none' : undefined,
    cursor: onClick ? 'pointer' : 'default',
    display: 'block',
    flexShrink: 0,
    width: size,
    height: size
  })
)

const BadgeBlock = styled('div')({
  alignItems: 'center',
  display: 'flex',
  height: '25%',
  justifyContent: 'center',
  position: 'absolute',
  right: 0,
  top: 0,
  width: '25%'
})

const BadgeBlockInner = styled('div')({
  flexShrink: 0
})

interface Props {
  hasBadge?: boolean
  isConnected?: boolean
  onClick?: (e?: React.MouseEvent) => void
  picture: string
  sansRadius?: boolean
  sansShadow?: boolean
  size: number
}

const Avatar = forwardRef((props: Props, ref: any) => {
  const {hasBadge, isConnected, onClick, picture, sansRadius, sansShadow, size} = props

  return (
    <ImageBlock
      ref={ref}
      onClick={onClick}
      sansRadius={sansRadius}
      sansShadow={sansShadow}
      picture={picture}
      size={size}
    >
      {hasBadge && (
        <BadgeBlock>
          <BadgeBlockInner>
            <AvatarBadge isConnected={isConnected || false} />
          </BadgeBlockInner>
        </BadgeBlock>
      )}
    </ImageBlock>
  )
})

export default Avatar
