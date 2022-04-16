import styled from 'styled-components'
import { useEffect, useRef, useState, VFC } from 'react'
import ReactDOM from 'react-dom'
import { COLOR_BACKGROUND } from '../../../styles/constants/colors'
import { FONT_SIZE_HEADER_SECONDARY } from '../../../styles/constants/fontSizes'
import { MODAL_ROOT_ID } from '../../utils/constants/elementIds'

interface ModalProps {
  show: boolean
  onClose: () => void
  children: any
  title: string
}

export const Modal: VFC<ModalProps> = (props: ModalProps) => {
  const [isBrowser, setIsBrowser] = useState(false)
  const modal = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  useEffect(() => {
    if (!props.show) return

    function closeModalOnClickAway(event: MouseEvent) {
      const eventTargetElement = event.target as HTMLElement
      if (modal.current && !modal.current.contains(eventTargetElement)) {
        props.onClose()
      }
    }

    window.addEventListener('click', closeModalOnClickAway)

    return () => window.removeEventListener('click', closeModalOnClickAway)
  }, [props.show])

  const handleCloseClick = (e: any) => {
    e.preventDefault()
    props.onClose()
  }

  const modalContent = props.show && (
    <StyledModalOverlay>
      <StyledModal ref={modal}>
        <StyledModalHeader>
          <StyledModalTitle>{props.title}</StyledModalTitle>
          <CloseIcon>
            <a href="#" onClick={handleCloseClick}>
              x
            </a>
          </CloseIcon>
        </StyledModalHeader>
        <StyledModalBody>{props.children}</StyledModalBody>
      </StyledModal>
    </StyledModalOverlay>
  )

  if (isBrowser) {
    const rootNode = document.getElementById(MODAL_ROOT_ID)
    if (rootNode) {
      return ReactDOM.createPortal(modalContent, rootNode)
    } else {
      return null
    }
  } else {
    return null
  }
}

const StyledModal = styled.div`
  background: ${COLOR_BACKGROUND};
  width: 500px;
  height: 600px;
  border-radius: 6px;
  padding: 15px;
`

const StyledModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`

const StyledModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0 3rem;
`

const StyledModalTitle = styled.h1`
  font-size: ${FONT_SIZE_HEADER_SECONDARY};
  font-weight: normal;
`

const CloseIcon = styled.div``

const StyledModalBody = styled.div`
  padding-top: 10px;
`

export default Modal
