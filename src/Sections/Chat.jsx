import { useCallback } from 'react'
import { useChat } from '../ChatContext'
import styled, { useTheme } from 'styled-components'
import { nanoid } from 'nanoid'
import bcrypt from 'bcryptjs'
import dayjs from 'dayjs'

const ChatDiv = styled.div`
  background-color: ${({ theme }) => theme.bgColor};
  border: 0.05rem solid ${({ theme }) => theme.borderColor};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 77.5vh;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 1rem;
  width: ${({ displayControlPanel }) => displayControlPanel ? '70%' : '100%'};
  @media (max-width: 1024px) {
    display: ${({ displayMode }) => displayMode};
  }
`
const Message = styled.div`
  align-items: ${({ alignItems }) => alignItems};
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`
const MessageInfo = styled.div`
  font-size: 0.55rem;
  order: ${({ order }) => order};
`
const MessageWrapper = styled.div`
  align-items: center;
  display: flex;
  gap: 0.25rem;
`
const MessageCloud = styled.div`
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: ${({ borderRadius }) => borderRadius};
  color: ${({ color }) => color};
  max-width: 32rem;
  padding: 0.5rem 1rem;
  text-align: left;
  white-space: pre-wrap;
  word-break: break-word;
`

export default function Chat({ displayControlPanel, storedId: thisId }) {
  const { messages } = useChat()
  const theme = useTheme()

  const scrollToLastMessage = useCallback((node) => {
    if (node) node.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <ChatDiv displayControlPanel={displayControlPanel} displayMode={displayControlPanel ? 'none' : 'flex'}>
      {
        messages.map(({ date, name, socketId, storedId, text }, index) => {
          const isStoredId = bcrypt.compareSync(thisId, storedId)
          date = dayjs.unix(date).format('h:mm A')
          return <Message alignItems={isStoredId ? 'flex-end' : 'flex-start'} key={nanoid()} ref={messages.length - 1 === index ? scrollToLastMessage : null}>
            <MessageInfo title={socketId}>{isStoredId ? 'You' : `${name} (${socketId.substring(0, 6)}...)`} said</MessageInfo>
            <MessageWrapper>
              <MessageInfo order={isStoredId ? '0' : '1'}>{date}</MessageInfo>
              <MessageCloud backgroundColor={isStoredId ? theme.accentColor : theme.bgColor3} borderRadius={isStoredId ? '1rem 0 0 1rem' : '0 1rem 1rem 0'} color={isStoredId ? 'white' : 'inherit'}>{text}</MessageCloud>
            </MessageWrapper>
          </Message>
        })
      }
    </ChatDiv>
  )
}
