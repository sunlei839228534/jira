import { SearchPanel  } from './search-panel'
import { List }from './list'
import { useState , useEffect } from 'react'

const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([])

  const [ param,setParam ] = useState({
    name: '',
    personId: ''
  })

  const [list,setList ] = useState([])

  useEffect(() => {
    fetch(`${apiUrl}/projects`).then(async (response) => {
      setList(await response.json())
    })

  }, [param])

  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      setUsers(await response.json())
    })
  }, [])
  return <div>
    <SearchPanel users={users} param={param} setParam={setParam}></SearchPanel>
    <List users={users} list={list}></List>
  </div>
}