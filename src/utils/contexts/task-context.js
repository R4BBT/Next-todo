import { useToast } from '@chakra-ui/react'
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import { createContext, useContext, useEffect, useState } from 'react'
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

  let userID = authenticated ? user.uid : 'anonymous'

  // Getting data
  useEffect(() => {
    setLoading(true)

    // Sorting logic
    const userTaskCollectionReference = collection(db, `todos/${userID}/tasks`)
    let userTaskQueryReference

    // All tasks
    if (
      filter.important === true &&
      filter.urgent === false &&
      filter.all === true
    ) {
      userTaskQueryReference = query(
        userTaskCollectionReference,
        orderBy(sortField, sortDirection),
        where('important', '==', true),
        limit(10)
      )
    }

    if (
      filter.important === true &&
      filter.urgent === true &&
      filter.all === true
    ) {
      userTaskQueryReference = query(
        userTaskCollectionReference,
        orderBy(sortField, sortDirection),
        where('important', '==', true),
        where('urgent', '==', true),
        limit(10)
      )
    }

    if (
      filter.important === false &&
      filter.urgent === true &&
      filter.all === true
    ) {
      userTaskQueryReference = query(
        userTaskCollectionReference,
        orderBy(sortField, sortDirection),
        where('urgent', '==', true),
        limit(10)
      )
    }
    if (
      filter.important === false &&
      filter.urgent === false &&
      filter.all === true
    ) {
      userTaskQueryReference = query(
        userTaskCollectionReference,
        orderBy(sortField, sortDirection),
        limit(10)
      )
    }

    // Incomplete Filter
    if (
      filter.important === true &&
      filter.urgent === false &&
      filter.complete === false &&
      filter.all === false
    ) {
      userTaskQueryReference = query(
        userTaskCollectionReference,
        orderBy(sortField, sortDirection),
        limit(10),
        where('important', '==', true),
        where('status', '==', 'incomplete')
      )
    }
    if (
      filter.important === true &&
      filter.urgent === true &&
      filter.complete === false &&
      filter.all === false
    ) {
      userTaskQueryReference = query(
        userTaskCollectionReference,
        orderBy(sortField, sortDirection),
        limit(10),
        where('important', '==', true),
        where('urgent', '==', true),
        where('status', '==', 'incomplete')
      )
    }
    if (
      filter.important === false &&
      filter.urgent === true &&
      filter.complete === false &&
      filter.all === false
    ) {
      userTaskQueryReference = query(
        userTaskCollectionReference,
        orderBy(sortField, sortDirection),
        limit(10),
        where('urgent', '==', true),
        where('status', '==', 'incomplete')
      )
    }
    if (
      filter.important === false &&
      filter.urgent === false &&
      filter.complete === false &&
      filter.all === false
    ) {
      userTaskQueryReference = query(
        userTaskCollectionReference,
        orderBy(sortField, sortDirection),
        limit(10),
        where('status', '==', 'incomplete')
      )
    }

    // Complete Filter
    if (
      filter.important === true &&
      filter.urgent === false &&
      filter.complete === true &&
      filter.all === false
    ) {
      userTaskQueryReference = query(
        userTaskCollectionReference,
        orderBy(sortField, sortDirection),
        limit(10),
        where('important', '==', true),
        where('status', '==', 'complete')
      )
    }
    if (
      filter.important === true &&
      filter.urgent === true &&
      filter.complete === true &&
      filter.all === false
    ) {
      userTaskQueryReference = query(
        userTaskCollectionReference,
        orderBy(sortField, sortDirection),
        limit(10),
        where('important', '==', true),
        where('urgent', '==', true),
        where('status', '==', 'complete')
      )
    }
    if (
      filter.important === false &&
      filter.urgent === true &&
      filter.complete === true &&
      filter.all === false
    ) {
      userTaskQueryReference = query(
        userTaskCollectionReference,
        orderBy(sortField, sortDirection),
        limit(10),
        where('urgent', '==', true),
        where('status', '==', 'complete')
      )
    }
    if (
      filter.important === false &&
      filter.urgent === false &&
      filter.complete === true &&
      filter.all === false
    ) {
      userTaskQueryReference = query(
        userTaskCollectionReference,
        orderBy(sortField, sortDirection),
        limit(10),
        where('status', '==', 'complete')
      )
    }

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
  }, [userID, sortField, sortDirection, filter, setLoading, toast])

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
