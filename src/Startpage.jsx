import { useEffect, useRef, useState } from 'react'
import { useChat } from './ChatContext'
import styled, { ThemeProvider } from 'styled-components'
import { darkTheme, GlobalStyle, lightTheme } from './style'
import { BallTriangle } from 'react-loader-spinner'
import { nanoid } from 'nanoid'
const storedId = localStorage.getItem('storedId') || nanoid(12)
import io from 'socket.io-client'
const socket = io(import.meta.env.VITE_BACKEND_URL, {
  query: {
    storedId
  },
  transports: ['websocket'],
  upgrade: false
})
import axios from 'axios'

import Controls from './Sections/Controls'
import { BeforeInput, Input } from './MinorComponents'
import YourChat from './Sections'

const StartpageDiv = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.bgColor2};
  border-radius: 1rem;
  box-shadow: 0rem 0rem 0.75rem 0.25rem ${({ theme }) => theme.shadowColor};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.75rem;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`
const CustomInput = styled(Input)`
  box-sizing: border-box;
  height: 2.5rem;
  width: 16rem;
  @media (max-width: 768px) {
    width: 14rem;
  }
`
const JoinButton = styled.button`
  background-color: ${({ theme }) => theme.accentColor};
  border: none;
  border-radius: 0.5rem;
  color: white;
  cursor: pointer;
  display: flex;
  gap: 0.25rem;
  height: 2.5rem;
  justify-content: center;
  padding: 0.75rem;
  width: 16rem;
  :hover {
    filter: brightness(115%);
  }
  @media (max-width: 768px) {
    width: 14rem;
  }
`

export default function Startpage() {
  const { channel, name, setChannel, setMembers, setMessages, setName } = useChat()
  const [theme, setTheme] = useState(getTheme())

  const nameRef = useRef(name)
  const [isReady, setIsReady] = useState(null)

  function getTheme() {
    const storedTheme = localStorage.getItem('theme')
    if (storedTheme) return storedTheme
    const preferedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    preferedTheme ? 'dark' : 'light'
  }
  async function joinChat(e) {
    e.preventDefault()
    if (isReady === false) return
    setIsReady(false)
    localStorage.setItem('name', name)
    localStorage.setItem('channel', channel)
    socket.emit('check_if_exists', channel)
  }

  useEffect(() => {
    nameRef.current = name
  }, [name])
  useEffect(() => {
    socket.on('is_duplicate', ({ channel, isDuplicate }) => {
      if (!isDuplicate) {
        socket.emit('join_channel', { channel, name: nameRef.current })
      }
      else {
        alert('You are already in this channel!')
      }
    })
    socket.on('receive_previous_messages', async (channel) => {
      const messages = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/channels/${channel}/messages`)
      setMessages(messages.data)
      const members = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/channels/${channel}/members`)
      setMembers(members.data.reverse())
      setIsReady(true)
    })
  }, [socket])

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyle />
      {
        !isReady ?
          <StartpageDiv>
            <Controls setTheme={setTheme} theme={theme} />
            <Form onSubmit={(e) => joinChat(e)}>
              <BeforeInput content='Name'>
                <CustomInput defaultValue={name} onChange={(e) => setName(e.target.value)} placeholder='Your name...' required type='text' />
              </BeforeInput>
              <BeforeInput content='Channel'>
                <CustomInput defaultValue={channel} onChange={(e) => setChannel(e.target.value)} placeholder='Channel you want to join...' required type='text' />
              </BeforeInput>
              <JoinButton type='submit'>Start Chatting{isReady === false ? <BallTriangle ariaLabel='(Wait...)' color='white' height='15' width='15' /> : null}</JoinButton>
            </Form>
          </StartpageDiv> :
          <YourChat setTheme={setTheme} socket={socket} storedId={storedId} theme={theme} />
      }
    </ThemeProvider>
  )
}
