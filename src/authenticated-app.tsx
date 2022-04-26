import styled from '@emotion/styled'
import { Row } from './components/lib'
import { useAuth } from './context/auth-context'
import { ProjectListScreen } from './screen/project-list'

export const AuthenticatedApp =() => {
  const  {logout} = useAuth()
  return <Container>
    <Header between={true} >
      <HeaderLeft gap={true}>
        <h3>logo</h3>
        <h3>项目</h3>
        <h3>用户</h3>
      </HeaderLeft>
      <HeaderRight>
        <button onClick={logout}>登出</button>
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
