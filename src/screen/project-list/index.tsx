import { SearchPanel  } from './search-panel'
import { List }from './list'
import { useState , useEffect } from 'react'
import { cleanObject, useDebounce } from '../../utils'
import { useHttp } from '../../utils/http'
import { useAuth } from '../../context/auth-context'
import styled from '@emotion/styled'


export const ProjectListScreen = () => {
  const [users, setUsers] = useState([])
  const { logout}  = useAuth()

  const [ param,setParam ] = useState({
    name: '',
    personId: ''
  })

  const debouncedParam = useDebounce<typeof param>(param,2000)
  const [list,setList ] = useState([])
  const client = useHttp()

  useEffect(() => {
    client('projects', { data: cleanObject(debouncedParam)}).then(setList)
  }, [debouncedParam])

  useEffect(() => {
    client('users').then(setUsers)
  }, [])
  return <Container>
    <h1>项目列表</h1>
    <SearchPanel users={users} param={param} setParam={setParam}></SearchPanel>
    <List users={users} list={list}></List>
  </Container>
}

const Container = styled.div`
padding: 3.2rem
`