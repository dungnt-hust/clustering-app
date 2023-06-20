
import styled from 'styled-components'
import Container from '~/layouts/components/Container'
import Index from '~/views/algorithm/Index'

const AlgorithmPage = () => {
  return (
    <Wrapper>
      <Container>
        <Panel className='form'>
              <Index />
        </Panel>
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.div``
const Panel = styled.div`
  margin-top: 20px;
  .form{
    border-radius: 8px;
    padding: 20px 0;
    
  }
`

export default AlgorithmPage
