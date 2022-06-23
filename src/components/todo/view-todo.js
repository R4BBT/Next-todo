export const ViewTodo = () => {
  return <div>ViewTodo</div>
}

const querySnapshot = await getDocs(collection(db, 'users'))
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`)
})
