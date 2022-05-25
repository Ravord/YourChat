import { useChat } from '../ChatContext'
import styled from 'styled-components'
import bcrypt from 'bcryptjs'

const UsersDiv = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.bgColor};
  border: 0.05rem solid ${({ theme }) => theme.borderColor};
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  font-family: Verdana;
  gap: 1rem;
  height: 100%;
  overflow-y: auto;
  padding: 1rem;
  scrollbar-width: none;
  word-break: break-word;
  ::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 1024px) {
    border-radius: initial;
  }
`
const Text = styled.a``
const Bold = styled.b`
  color: ${({ theme }) => theme.accentColor}
`
const ListedUsers = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`
const Small = styled.span`
  font-size: 0.55rem;
`

export default function Users({ storedId: thisId }) {
  const { channel, members } = useChat()

  return (
    <UsersDiv>
      <Text>Active users in [<Bold>{channel.substring(0, 12).trim()}</Bold>]</Text>
      <ListedUsers>
        {
          members.map(({ memberName, memberSocketId, memberStoredId }) => {
            const isStoredId = bcrypt.compareSync(thisId, memberStoredId)
            memberName = <>{memberName}<br /><Small>({memberSocketId})</Small></>
            return <Text key={memberSocketId}>{!isStoredId ? memberName : <Bold>{memberName}</Bold>}</Text>
          })
        }
      </ListedUsers>
    </UsersDiv>
  )
}
