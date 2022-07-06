import { useToast } from '@chakra-ui/react'
import { useAuth } from './auth-context'

const { useContext, createContext, useState } = require('react')

export const TaskContext = createContext({
  data,
})

const [data, setData] = useState()
const toast = useToast()

export const useTask = () => useContext(TaskContext)

export const TaskContextProvider = ({ children }) => {
  const { loading, setLoading } = useAuth()

  useEffect(() => {
    setLoading(true)
    const unsub = onSnapshot(
      userTaskQueryReference,
      (querySnapshot) => {
        const tasks = []
        querySnapshot.forEach(
          (doc) => tasks.push({ id: doc.id, ...doc.data() }) //doc.data() does not include id
        )
        setData(tasks)
      },
      (error) => {
        toast({
          status: 'error',
          title: 'An error has occured',
          description: `${error.message}`,
          isClosable: true,
        })
      }
    )

    setLoading(false)

    return () => {
      unsub()
    }
  }, [])
}
