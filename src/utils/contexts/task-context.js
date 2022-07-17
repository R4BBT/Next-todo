import { useToast } from '@chakra-ui/react'
import {
  collection,
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
  pageLimit: Number,
  totalItems: Number,
  lastPageSize: Number,
  numberOfFullPages: Number,
  pageSet: Number,
  setPageSet: Function,
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

  // Pagination
  const pageLimit = 10
  const [pageSet, setPageSet] = useState(0)
  const [totalItems, setTotalItems] = useState(0)
  const [lastPageSize, setLastPageSize] = useState(0)
  const [numberOfFullPages, setNumberOfFullPages] = useState(0)

  // Getting data
  useEffect(() => {
    setLoading(true)
    let userID = authenticated ? user.uid : 'anonymous'
    const userTaskCollectionReference = collection(db, `todos/${userID}/tasks`)

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
      ...queryConstraints
    )

    // Snapshot logic
    const unsub = onSnapshot(
      userTaskQueryReference,
      (querySnapshot) => {
        const tasks = []
        if (querySnapshot.empty) {
          setData(tasks)
          setPageSet(0)
          setTotalItems(0)
          setLastPageSize(0)
          setNumberOfFullPages(0)
          return
        } else {
          querySnapshot.forEach(
            (doc) => tasks.push({ id: doc.id, ...doc.data() }) //doc.data() does not include id
          )
          setData(tasks)
          setPageSet(0)
          setTotalItems(querySnapshot.size)
          setLastPageSize(querySnapshot.size % pageLimit)
          setNumberOfFullPages(Math.floor(querySnapshot.size / pageLimit))
        }
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
  }, [sortField, sortDirection, filter, setLoading, toast, authenticated, user])

  // Returning Context Provider
  const value = {
    data,
    filter,
    setFilter,
    sortField,
    setSortField,
    setSortDirection,
    pageLimit,
    totalItems,
    lastPageSize,
    numberOfFullPages,
    pageSet,
    setPageSet,
  }
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}
