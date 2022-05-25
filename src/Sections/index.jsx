import { useEffect, useState } from 'react'
import { useChat } from '../ChatContext'
import styled from 'styled-components'

import Controls from './Controls'
import Chat from './Chat'
import Users from './Users'
import Inputs from './Inputs'

const YourChatDiv = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.bgColor2};
  border-radius: 1rem;
  box-shadow: 0rem 0rem 0.75rem 0.25rem ${({ theme }) => theme.shadowColor};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 92.5vh;
  overflow-x: hidden;
  padding: 0.75rem;
  @media (max-width: 576px) {
    padding: 0.75rem 0;
  }
`
const SectionsWrapper = styled.div`
  display: flex;
  gap: 0.75rem;
  width: 72rem;
  @media (max-width: 1440px) {
    width: 64rem;
  }
  @media (max-width: 1280px) {
    width: 100%;
  }
  @media (max-width: 1024px) {
    width: 95vw;
  }
`
const InnerSectionsWrapper = styled(SectionsWrapper)`
  display: ${({ displayMode }) => displayMode};
  flex-direction: column;
  height: 77.5vh;
  width: ${({ displayControlPanel }) => displayControlPanel ? '30%' : '0'};
  @media (max-width: 1024px) {
    width: ${({ displayControlPanel }) => displayControlPanel ? '100%' : '0'};
  }
`

export default function YourChat({ setTheme, socket, storedId, theme }) {
  const { channel, setMembers, setMessages } = useChat()

  const [displayControlPanel, setDisplayControlPanel] = useState(window.matchMedia('(max-width: 1024px)').matches ? false : true)

  // main
  useEffect(() => {
    if (!localStorage.getItem('storedId')) {
      localStorage.setItem('storedId', storedId)
    }
  }, [])
  useEffect(() => {
    document.title = `YourChat [${channel.substring(0, 12).trim()}]`
  }, [channel])

  // socket
  useEffect(() => {
    socket.on('receive_channel_members', (members) => {
      setMembers(members.reverse())
    })
    socket.on('receive_message', (message) => {
      setMessages((prev) => [...prev, message])
    })
    return () => socket.disconnect()
  }, [socket])

  return (
    <YourChatDiv>
      <SectionsWrapper>
        <Chat displayControlPanel={displayControlPanel} storedId={storedId} />
        <InnerSectionsWrapper displayControlPanel={displayControlPanel} displayMode={displayControlPanel ? 'flex' : 'none'}>
          <Controls displayControlPanel={displayControlPanel} setDisplayControlPanel={setDisplayControlPanel} setTheme={setTheme} theme={theme} />
          <Users storedId={storedId} />
        </InnerSectionsWrapper>
      </SectionsWrapper>
      <Inputs displayControlPanel={displayControlPanel} setDisplayControlPanel={setDisplayControlPanel} socket={socket} />
    </YourChatDiv>
  )
}
