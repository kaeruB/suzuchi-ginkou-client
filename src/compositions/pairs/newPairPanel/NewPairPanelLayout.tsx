import { ChangeEvent, FC, useState } from 'react'
import {
  FormColumn,
  FormDoubleColumn,
  FormErrorMessage,
  FormFlexRow,
  FormRow,
  FormRowInput,
  FormRowLabel,
  FormWrapper,
} from '../../../../styles/components/form'
import { CreateButton } from '../../../../styles/components/button'
import styled from 'styled-components'
import { FONT_SIZE_HEADER_SECONDARY } from '../../../../styles/constants/fontSizes'

interface NewPairPanelLayoutProps {
  onSubmit: (body: { partnerEmail: string }) => void
  errorMsg: string | null
}

export const NewPairPanelLayout: FC<NewPairPanelLayoutProps> = (
  props: NewPairPanelLayoutProps,
) => {
  const [partnerEmail, setPartnerEmail] = useState<string>('')

  return (
    <FormWrapper>
      <TitleRow>Create New Transaction Dashboard</TitleRow>
      <FormRow>
        <FormColumn>
          <FormRowLabel htmlFor="amount">Email address</FormRowLabel>
        </FormColumn>
        <FormDoubleColumn>
          <FormFlexRow>
            <FormRowInput
              type="text"
              min="0"
              id="partnerEmail"
              autoComplete="partnerEmail"
              name="partnerEmail"
              required
              defaultValue={partnerEmail}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPartnerEmail(e.target.value)
              }
            />
            <SubmitButton
              disabled={partnerEmail === ''}
              onClick={() => props.onSubmit({ partnerEmail })}
            >
              +
            </SubmitButton>
          </FormFlexRow>
        </FormDoubleColumn>
        <FormErrorMessage>{props.errorMsg}</FormErrorMessage>
      </FormRow>
    </FormWrapper>
  )
}

const TitleRow = styled.div`
  font-size: ${FONT_SIZE_HEADER_SECONDARY};
  margin-bottom: 4rem;
`

const SubmitButton = styled(CreateButton)`
  margin-left: 2rem;
`

export default NewPairPanelLayout
