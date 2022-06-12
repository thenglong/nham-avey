interface FormErrorProps {
  errorMessage: string
}

export const FormError = ({ errorMessage }: FormErrorProps) => (
  <span role="alert" className="font-medium text-red-500">
    {errorMessage}
  </span>
)
