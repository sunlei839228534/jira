import { SearchPanel  } from './search-panel'
import { List }from './list'
import { useDebounce, useDoucumentTitle } from '../../utils'
import styled from '@emotion/styled'
import { useProjects } from '../../utils/use-project'
import { useUser } from '../../utils/use-user'
import { Button, Typography } from 'antd'
import { useProjectSearchParams } from './util'
import { Row, ButtonNoPadding } from '../../components/lib'
import { useDispatch } from 'react-redux'
import { projectListSlice } from '../../utils/project-list-slice'


export const ProjectListScreen = () => {
  const dispatch = useDispatch()

  const [param,setParam] = useProjectSearchParams()
  useDoucumentTitle('项目列表',false)

  const debouncedParam = useDebounce<typeof param>(param,2000)
  const {data:list,isLoading ,error ,retry} = useProjects(debouncedParam)
  const { data: users} = useUser()

  return <Container>
    <Row between={true}>
    <h1>项目列表</h1>
    <ButtonNoPadding type="link" onClick={() => dispatch(projectListSlice.actions.openProjectModal())}>创建项目</ButtonNoPadding>
    </Row>
      
    <SearchPanel users={users || []} param={param} setParam={setParam}></SearchPanel>
    {error ? <Typography.Text type="danger" >{error.message}</Typography.Text> : null}
    <List  refresh={retry} loading={isLoading} users={users || []} dataSource={list || []}></List>
  </Container>
}

const Container = styled.div`
padding: 3.2rem
`