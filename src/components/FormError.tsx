import { FieldError } from 'react-hook-form'

type TProps = {
  error: FieldError | undefined
  className?: string
}

const FormError = ({ error, className }: TProps) => {
  return <p className={`text-red-500 ${className}`}>{error?.message}</p>
}

export default FormError
