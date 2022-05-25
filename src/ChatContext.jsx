import { createContext, useContext, useState } from 'react'

const ChatContext = createContext()

export function useChat() {
  return useContext(ChatContext)
}

export default function ChatProvider({ children }) {
  const [name, setName] = useState(localStorage.getItem('name') || 'Anonymous')
  const [channel, setChannel] = useState(localStorage.getItem('channel') || 'Global')
  const [messages, setMessages] = useState([])
  const [members, setMembers] = useState([])

  return (
    <ChatContext.Provider value={{ name, setName, channel, setChannel, messages, setMessages, members, setMembers }}>
      {children}
    </ChatContext.Provider>
  )
}
