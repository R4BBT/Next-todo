import { useToast } from '@chakra-ui/react'
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { db } from 'utils/configs/firebase-client'
import { useAuth } from './auth-context'

export const TaskContext = createContext({
  data: {},
  filter: {},
  setFilter: () => {},
  sortField: '',
  setSortField: () => {},
  setSortDirection: () => {},
  // updateTask: () => {},
})

export const useTask = () => useContext(TaskContext)

export const TaskContextProvider = ({ children }) => {
  // Initializing
  const toast = useToast()
  const { setLoading, authenticated, user } = useAuth()
  const [data, setData] = useState()
  const [sortField, setSortField] = useState('createdAt')
  const [sortDirection, setSortDirection] = useState('desc')
  const [filter, setFilter] = useState({
    important: false,
    urgent: false,
    complete: false,
    all: false,
  })

  // const paginate = useState(false)
  const lastDocumentRef = useRef()

  let userID = authenticated ? user.uid : 'anonymous'
  const userTaskCollectionReference = collection(db, `todos/${userID}/tasks`)

  // Getting data
  useEffect(() => {
    setLoading(true)

    // Defining the query constraints
    const queryConstraints = []

    if (filter.important === true) {
      queryConstraints.push(where('important', '==', true))
    }
    if (filter.urgent === true) {
      queryConstraints.push(where('urgent', '==', true))
    }
    if (filter.all === false) {
      if (filter.complete === true) {
        queryConstraints.push(where('status', '==', 'complete'))
      } else {
        queryConstraints.push(where('status', '==', 'incomplete'))
      }
    }

    // Building the query
    const userTaskQueryReference = query(
      userTaskCollectionReference,
      orderBy(sortField, sortDirection),
      limit(10),
      ...queryConstraints
    )

    // Snapshot logic
    const unsub = onSnapshot(
      userTaskQueryReference,
      (querySnapshot) => {
        const tasks = []
        if (querySnapshot.empty) {
          setData(tasks)
          return
        }
        querySnapshot.forEach(
          (doc) => tasks.push({ id: doc.id, ...doc.data() }) //doc.data() does not include id
        )
        // Find the last document
        const lastDocument = querySnapshot.docs[querySnapshot.docs.length - 1]
        lastDocumentRef.current = lastDocument

        setData(tasks)
      },
      (error) => {
        unsub()
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
  }, [
    userID,
    sortField,
    sortDirection,
    filter,
    setLoading,
    toast,
    userTaskCollectionReference,
  ])

  // Adding data (Currently handled by component)

  // Updating data (Not used atm)
  // const updateTask = async (docRef, title, description, important, urgent) => {
  //   try {
  //     await updateDoc(docRef, {
  //       title: title,
  //       description: description,
  //       updatedAt: serverTimestamp(),
  //       important,
  //       urgent,
  //     })
  //   } catch (error) {
  //     toast({
  //       status: 'error',
  //       title: 'An error has occured',
  //       description: `${error.message}`,
  //       isClosable: true,
  //     })
  //   }
  // }

  // Returning Context Provider
  const value = {
    data,
    filter,
    setFilter,
    sortField,
    setSortField,
    setSortDirection,
    // updateTask,
  }
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}
