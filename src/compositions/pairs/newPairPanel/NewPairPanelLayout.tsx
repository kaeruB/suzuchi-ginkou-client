import { ChangeEvent, FC, useState } from 'react'
import {
  FormColumn,
  FormDoubleColumn,
  FormRow,
  FormRowInput,
  FormRowLabel,
  FormSubmitButton,
  FormWrapper,
} from '../../../../styles/components/form'

interface NewPairPanelLayoutProps {
  onSubmit: (body: { partnerId: string }) => void
}

export const NewPairPanelLayout: FC<NewPairPanelLayoutProps> = (
  props: NewPairPanelLayoutProps,
) => {
  const [partnerId, setPartnerId] = useState<string>('')

  return (
    <FormWrapper>
      Create new transaction dashboard
      <FormRow>
        <FormColumn>
          <FormRowLabel htmlFor="amount">User ID</FormRowLabel>
        </FormColumn>
        <FormDoubleColumn>
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
        </FormDoubleColumn>
      </FormRow>
      <FormSubmitButton
        disabled={partnerId === ''}
        onClick={() => props.onSubmit({ partnerId })}
      >
        Create
      </FormSubmitButton>
    </FormWrapper>
  )
}

export default NewPairPanelLayout
