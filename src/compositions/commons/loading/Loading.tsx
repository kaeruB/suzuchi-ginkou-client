import { FlexCentered } from '../../../../styles/utils/layout'
import { FC } from 'react'
import styled from 'styled-components'
import { FONT_SIZE_HEADER_PRIMARY } from '../../../../styles/constants/fontSizes'
import { COLOR_FONT_PRIMARY } from '../../../../styles/constants/colors'

export const Loading: FC = () => {
  return (
    <LoadingWrapper>
      <LoadingText>Loading...</LoadingText>
    </LoadingWrapper>
  )
}

const LoadingWrapper = styled.div`
  ${FlexCentered};
  height: 100vh;
`

const LoadingText = styled.div`
  font-family: 'Poppins', sans-serif;
  color: ${COLOR_FONT_PRIMARY};
  font-size: ${FONT_SIZE_HEADER_PRIMARY};
`

export default Loading
