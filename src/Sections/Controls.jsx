import styled from 'styled-components'

import { Controller, ControllerImage } from '../MinorComponents'

const ControlsDiv = styled.div`
  display: flex;
  font-family: Verdana;
  gap: 0.3rem;
  justify-content: center;
  @media (max-width: 1280px) {
    flex-wrap: wrap;
  }
`
const Controllers = styled.div`
  display: flex;
  gap: 0.3rem;
`
const ProjectDiv = styled.div`
  background-color: ${({ theme }) => theme.bgColor};
  border: 0.05rem solid ${({ theme }) => theme.borderColor};
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.accentColor};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0.5rem;
  width: 10rem;
`
const ProjectTitle = styled.h2`
  margin: 0;
`
const Rule = styled.hr`
  border: none;
  border-bottom: dotted ${({ theme }) => theme.fontColor};
  margin: 0;
`
const CreatedBy = styled.b`
  color: ${({ theme }) => theme.fontColor};
  font-size: 0.75rem;
`
const Link = styled.a`
  color: ${({ theme }) => theme.accentColor};
`

export default function Controls({ displayControlPanel, setDisplayControlPanel, setTheme, theme }) {
  function changeTheme() {
    const reverseTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(reverseTheme)
    localStorage.setItem('theme', reverseTheme)
  }

  return (
    <ControlsDiv>
      <Controllers>
        {
          displayControlPanel ?
            <Controller onClick={() => setDisplayControlPanel(false)} title='Hide Control Panel'>
              <ControllerImage className='bi bi-eye-slash' />
            </Controller> : null
        }
        <Controller onClick={changeTheme} title='Switch Theme'>
          <ControllerImage className={theme === 'light' ? 'bi bi-moon' : 'bi bi-sun'} />
        </Controller>
      </Controllers>
      <ProjectDiv>
        <ProjectTitle>YourChat</ProjectTitle>
        <Rule />
        <CreatedBy>made by<br /><Link href='https://github.com/Ravord/'>m_skotarek</Link></CreatedBy>
      </ProjectDiv>
    </ControlsDiv>
  )
}
