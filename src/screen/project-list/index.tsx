import { SearchPanel  } from './search-panel'
import { List }from './list'
import { useState  } from 'react'
import { useDebounce } from '../../utils'
import styled from '@emotion/styled'
import { useProjects } from '../../utils/use-project'
import { useUser } from '../../utils/use-user'
import { Typography } from 'antd'


export const ProjectListScreen = () => {
  const [ param,setParam ] = useState({
    name: '',
    personId: ''
  })

  const debouncedParam = useDebounce<typeof param>(param,2000)
  const {data:list,isLoading ,error} = useProjects(debouncedParam)
  const { data: users} = useUser()

  return <Container>
    <h1>项目列表</h1>
    <SearchPanel users={users || []} param={param} setParam={setParam}></SearchPanel>
    {error ? <Typography.Text type="danger" >{error.message}</Typography.Text> : null}
    <List loading={isLoading} users={users || []} dataSource={list || []}></List>
  </Container>
}

const Container = styled.div`
padding: 3.2rem
`