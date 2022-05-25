import { useEffect, useState } from 'react'
import { useChat } from '../ChatContext'
import styled from 'styled-components'

import { ControllerImage, BeforeInput, Input } from '../MinorComponents'

const InputsDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;
`
const CustomControllerImage = styled(ControllerImage)`
  cursor: pointer;
  font-size: 1.5rem;
  left: 50%;
  position: absolute;
  top: -2.15rem;
  transform: translateX(-50%);
`
const ShortInput = styled(Input)`
  width: 8rem;
  @media (max-width: 576px) {
    width: 37.5vw;
  }
`
const CustomBeforeInput = styled(BeforeInput)`
  @media (max-width: 576px) {
    order: 1;
    z-index: 1;
  }
`
const LongInput = styled(Input)`
  width: 32rem;
  @media (max-width: 1024px) {
    width: 24rem;
  }
  @media (max-width: 768px) {
    width: 12rem;
  }
  @media (max-width: 576px) {
    width: 80vw;
  }
`

export default function Inputs({ displayControlPanel, setDisplayControlPanel, socket }) {
  const { channel, name, setChannel, setName } = useChat()

  const [text, setText] = useState('')

  function joinChannel(e) {
    if (!e.target.value) return
    socket.emit('check_if_edited_exists', e.target.value)
  }
  function changeName(e) {
    const newName = e.target.value
    if (!newName) return
    setName(newName)
    localStorage.setItem('name', newName)
    socket.emit('change_name', { channel, name: newName })
  }
  function sendMessage(e) {
    if (e.key === 'Enter' && e.shiftKey === false) {
      e.preventDefault()
      if (!text) return
      socket.emit('send_message', { name, text, channel })
      setText('')
    }
  }

  useEffect(() => {
    socket.on('is_edited_duplicate', ({ channel: newChannel, isDuplicate }) => {
      if (!isDuplicate) {
        socket.emit('leave_channel', channel)
        setChannel(newChannel)
        localStorage.setItem('channel', newChannel)
        socket.emit('join_channel', { channel: newChannel, name })
      }
      else {
        alert('You are already in this channel!')
      }
    })
  }, [socket])

  return (
    <InputsDiv>
      {
        !displayControlPanel ?
          <CustomControllerImage className='bi bi-eye' onClick={() => setDisplayControlPanel(true)} title='Show Control Panel' /> : null
      }
      <BeforeInput content='Name'>
        <ShortInput defaultValue={name} onBlur={(e) => changeName(e)} placeholder='Your name...' type='text' />
      </BeforeInput>
      <CustomBeforeInput content='Message'>
        <LongInput as='textarea' onChange={(e) => setText(e.target.value)} onKeyDown={(e) => sendMessage(e)} placeholder='Type something here...' type='text' value={text}></LongInput>
      </CustomBeforeInput>
      <BeforeInput content='Channel'>
        <ShortInput defaultValue={channel} onBlur={(e) => joinChannel(e)} placeholder='Current channel...' type='text' />
      </BeforeInput>
    </InputsDiv>
  )
}
