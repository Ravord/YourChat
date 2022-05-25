import ReactDOM from 'react-dom/client'
import 'bootstrap-icons/font/bootstrap-icons.css'

import ChatProvider from './ChatContext'
import App from './Startpage'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChatProvider>
    <App />
  </ChatProvider>
)
