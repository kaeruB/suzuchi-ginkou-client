import { VFC } from 'react'
import styled from 'styled-components'

export const Arrow: VFC = () => {
  return (
    <ArrowContainer>
      <ArrowPartsWrapper>
        <ArrowLeft />
        <Line />
        <ArrowRight />
      </ArrowPartsWrapper>
    </ArrowContainer>
  )
}

const ArrowContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
`

const ArrowPartsWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  transform: rotate(90deg) translateY(-10rem);
`

const ArrowCommon = styled.span`
  position: absolute;
  top: -0.3rem;
  bottom: 0;
  height: 1rem;
  border-right: 0.2rem solid black;
  display: inline-block;
`

const ArrowLeft = styled(ArrowCommon)`
  right: 0.3rem;
  transform: rotate(45deg);
`

const Line = styled.span`
  border-right: 0.2rem dashed black;
  display: inline-block;
  height: 20rem;
`

const ArrowRight = styled(ArrowCommon)`
  left: 0.3rem;
  transform: rotate(-45deg);
`

export default Arrow