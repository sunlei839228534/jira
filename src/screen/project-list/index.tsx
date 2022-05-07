import { SearchPanel  } from './search-panel'
import { List }from './list'
import { useDebounce, useDoucumentTitle } from '../../utils'
import styled from '@emotion/styled'
import { useProjects } from '../../utils/use-project'
import { useUser } from '../../utils/use-user'
import { useProjectModal, useProjectSearchParams } from './util'
import { Row ,ButtonNoPadding,ErrorBox } from '../../components/lib'


export const ProjectListScreen = () => {
  const [param,setParam] = useProjectSearchParams()
  const { open } = useProjectModal()
  useDoucumentTitle('项目列表',false)

  const debouncedParam = useDebounce<typeof param>(param,2000)
  const {data:list,isLoading ,error} = useProjects(debouncedParam)
  const { data: users} = useUser()

  return <Container>
    <Row between={true}>
    <h1>项目列表</h1>
    <ButtonNoPadding onClick={open} type="link">创建项目</ButtonNoPadding>
    </Row>
      
    <SearchPanel users={users || []} param={param} setParam={setParam}></SearchPanel>
    <ErrorBox error={error}></ErrorBox>
    <List   loading={isLoading} users={users || []} dataSource={list || []}></List>
  </Container>
}

const Container = styled.div`
padding: 3.2rem;
width: 100%;
`
