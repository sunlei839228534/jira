import { SearchPanel  } from './search-panel'
import { List }from './list'
import { useState , useEffect } from 'react'
import { cleanObject, useDebounce } from '../../utils'
import { useHttp } from '../../utils/http'
import { useAuth } from '../../context/auth-context'


export const ProjectListScreen = () => {
  const [users, setUsers] = useState([])
  const { logout}  = useAuth()

  const [ param,setParam ] = useState({
    name: '',
    personId: ''
  })

  const debouncedParam = useDebounce(param,2000)
  const [list,setList ] = useState([])
  const client = useHttp()

  useEffect(() => {
    client('projects', { data: cleanObject(debouncedParam)}).then(setList)
  }, [debouncedParam])

  useEffect(() => {
    client('users').then(setUsers)
  }, [])
  return <div>
    <SearchPanel users={users} param={param} setParam={setParam}></SearchPanel>
    <List users={users} list={list}></List>
  </div>
}