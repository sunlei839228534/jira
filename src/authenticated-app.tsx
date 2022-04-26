import styled from '@emotion/styled'
import { Row } from './components/lib'
import { useAuth } from './context/auth-context'
import { ProjectListScreen } from './screen/project-list'
import { ReactComponent as  SoftwareLogo} from './assets/software-logo.svg'
import { Dropdown, Menu,Button } from 'antd'

export const AuthenticatedApp =() => {
  const  {logout,user} = useAuth()
  return <Container>
    <Header between={true} >
      <HeaderLeft gap={true}>
        <SoftwareLogo width='18rem' color='rgb(38,132,255)'/>
        <h2>项目</h2>
        <h2>用户</h2>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown overlay={<Menu>
          <Menu.Item key="logout">
            <Button type='link' onClick={logout}>登出</Button>
          </Menu.Item>
        </Menu>}>   
        <Button type='link' onClick={e => e.stopPropagation()}>
          Hi, {user?.name}
        </Button>
        </Dropdown>
      </HeaderRight>
    </Header>
    <Main>
      <ProjectListScreen/>
    </Main>
  </Container>
}


const Container = styled.div`
  height: 100vh;
`

const Header = styled(Row)`
padding: 3.2rem;
box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
`

const HeaderLeft = styled(Row)`
`

const HeaderRight = styled.div`
`

const Main = styled.main`
 grid-area: main;
`

// const PageHeader = styled.header`
//   height: 6rem;
// `

// const Main = styled.main`
//   height: calc(100vh - 6rem);
// `
