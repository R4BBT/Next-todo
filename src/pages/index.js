import { useForm } from 'react-hook-form'

export default function Home() {
  const { handleSubmit, register, setError } = useForm({
    defaultValue: { firstName: '' },
  })

  return (
    <div>
      <div>Hello</div>
      <form onSubmit={() => handleSubmit(onSubmit, onError)(e).catch(() => {})}>
        <input
          id="firstName"
          name="firstName"
          type="text"
          {...register('firstName')}
        />
        <button type="submit"></button>
        <button
          type="button"
          onClick={() =>
            setError(
              'firstName',
              {
                type: 'server side',
                message: 'server return false',
              },
              { shouldFocus: true }
            )
          }
        ></button>
      </form>
    </div>
  )
}
