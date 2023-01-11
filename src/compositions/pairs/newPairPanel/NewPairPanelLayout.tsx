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
  onSubmit: (body: { partnerId: string }) => void
  errorMsg: string | null
}

export const NewPairPanelLayout: FC<NewPairPanelLayoutProps> = (
  props: NewPairPanelLayoutProps,
) => {
  const [partnerId, setPartnerId] = useState<string>('')

  return (
    <FormWrapper>
      <TitleRow>Create New Transaction Dashboard</TitleRow>
      <FormRow>
        <FormColumn>
          <FormRowLabel htmlFor="amount">User ID</FormRowLabel>
        </FormColumn>
        <FormDoubleColumn>
          <FormFlexRow>
            <FormRowInput
              type="text"
              min="0"
              id="partnerId"
              autoComplete="partnerId"
              name="partnerId"
              required
              defaultValue={partnerId}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPartnerId(e.target.value)
              }
            />
            <SubmitButton
              disabled={partnerId === ''}
              onClick={() => props.onSubmit({ partnerId })}
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
