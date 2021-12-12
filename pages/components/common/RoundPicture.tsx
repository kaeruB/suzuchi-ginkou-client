import { VFC } from 'react'
import styled from 'styled-components'
import { Person } from '../../utils/types'

interface RoundPictureProps {
  size: number
  person: Person
}

export const RoundPicture: VFC<RoundPictureProps> = (
  props: RoundPictureProps,
) => {
  const url = `images/${props.person}.png`
  return (
    <Figure size={props.size}>
      <Image src={url} alt={props.person} />
    </Figure>
  )
}

const Figure = styled.figure<{ size: number }>`
  width: ${(props) => props.size + 'rem'};
  height: ${(props) => props.size + 'rem'};
  float: left;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
`

const Image = styled.img`
  width: 100%;
  //filter: blur(3px) brightness(80%);
`

export default RoundPicture
