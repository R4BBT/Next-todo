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
})

export const useTask = () => useContext(TaskContext)

export const TaskContextProvider = ({ children }) => {
  // Initializing
  const toast = useToast()
  const { setLoading, authenticated, user } = useAuth()
  const [data, setData] = useState()
  const [sortField, setSortField] = useState('createdAt')
  const [sortDirection, setSortDirection] = useState('asc')
  const [filter, setFilter] = useState({ important: false, urgent: false })

  let userID = authenticated ? user.uid : 'anonymous'

  // Getting data
  useEffect(() => {
    setLoading(true)

    console.log(filter)

    const userTaskCollectionReference = collection(db, `todos/${userID}/tasks`)
    let userTaskQueryReference = query(
      userTaskCollectionReference,
      orderBy(sortField, sortDirection),
      limit(10)
    )

    if (filter.important === true && filter.urgent === false) {
      userTaskQueryReference = query(
        userTaskCollectionReference,
        orderBy(sortField, sortDirection),
        limit(10),
        where('important', '==', true)
      )
    }
    if (filter.urgent === true && filter.important === false) {
      userTaskQueryReference = query(
        userTaskCollectionReference,
        orderBy(sortField, sortDirection),
        limit(10),
        where('urgent', '==', true)
      )
    }
    if (filter.important === true && filter.urgent === true) {
      userTaskQueryReference = query(
        userTaskCollectionReference,
        orderBy(sortField, sortDirection),
        limit(10),
        where('important', '==', true),
        where('urgent', '==', true)
      )
    }

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
  }, [userID, sortField, sortDirection, filter])

  // Adding data

  // Returning Context Provider
  const value = {
    data,
    filter,
    setFilter,
    sortField,
    setSortField,
    setSortDirection,
  }
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}
