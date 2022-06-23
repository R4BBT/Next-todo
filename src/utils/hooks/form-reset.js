import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

export const useFormReset = () => {
  const { reset, isSubmitSuccessful } = useForm()

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
  }, [reset, isSubmitSuccessful])
}
