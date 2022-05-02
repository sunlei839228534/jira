import { SearchPanel  } from './search-panel'
import { List }from './list'
import { useDebounce, useDoucumentTitle } from '../../utils'
import styled from '@emotion/styled'
import { useProjects } from '../../utils/use-project'
import { useUser } from '../../utils/use-user'
import { Button, Typography } from 'antd'
import { useProjectSearchParams } from './util'
import { Row } from '../../components/lib'


export const ProjectListScreen = ({setProjectModalOpen}: {setProjectModalOpen: (isOpen:boolean) => void}) => {
  const [param,setParam] = useProjectSearchParams()
  useDoucumentTitle('项目列表',false)

  const debouncedParam = useDebounce<typeof param>(param,2000)
  const {data:list,isLoading ,error ,retry} = useProjects(debouncedParam)
  const { data: users} = useUser()

  return <Container>
    <Row between={true}>
    <h1>项目列表</h1>
      <Button onClick={() => setProjectModalOpen(true)} >创建项目</Button>
    </Row>
      
    <SearchPanel users={users || []} param={param} setParam={setParam}></SearchPanel>
    {error ? <Typography.Text type="danger" >{error.message}</Typography.Text> : null}
    <List setProjectModalOpen={setProjectModalOpen} refresh={retry} loading={isLoading} users={users || []} dataSource={list || []}></List>
  </Container>
}

const Container = styled.div`
padding: 3.2rem
`