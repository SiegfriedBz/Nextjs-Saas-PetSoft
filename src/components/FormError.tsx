import { FieldError } from 'react-hook-form'

type TProps = {
  error: FieldError | undefined
}

const FormError = ({ error }: TProps) => {
  return <p className='text-red-500'>{error?.message}</p>
}

export default FormError
