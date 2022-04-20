import { SearchPanel  } from './search-panel'
import { List }from './list'
import { useState , useEffect } from 'react'
import * as qs from 'qs'
import { cleanObject, useDebounce } from '../../utils'

const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([])

  const [ param,setParam ] = useState({
    name: '',
    personId: ''
  })

  const debouncedParam = useDebounce(param,2000)
  const [list,setList ] = useState([])

  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`).then(async (response) => {
      setList(await response.json())
    })

  }, [debouncedParam])

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