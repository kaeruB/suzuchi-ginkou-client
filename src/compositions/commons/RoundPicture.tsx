import styled from 'styled-components'
import Image from 'next/image'

interface RoundPictureProps {
  size: number
  src: string
  alt: string
}

export const RoundPicture = (props: RoundPictureProps) => {
  return (
    <Figure size={props.size}>
      <Image src={props.src} alt={props.alt} layout={'fill'} />
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

export default RoundPicture
