import styled from 'styled-components/macro'
import { mq } from 'styles/theme'

const ProjectYear = styled.div`
  display: grid;

  @media ${mq.md} {
    grid-template-columns: repeat(3, 1fr);
  }
  grid-gap: 0 2rem;
`

const Year = styled.div`
  margin: 4rem 0;
`

const Title = styled.h4`
  margin-bottom: 0.5rem;

  a,
  p {
    margin: 0;
    color: inherit !important;
    font-weight: inherit !important;
  }

  a {
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  }
`
const Description = styled.p`
  margin: 0;
  line-height: 1.4;
  margin-bottom: 0.5rem;
`

const Project = styled.div`
  margin: 1rem 0;
`

export default { ProjectYear, Description, Project, Title, Year }
