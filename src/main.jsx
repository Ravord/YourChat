import ReactDOM from 'react-dom/client'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import ChatProvider from './ChatContext'
import App from './Startpage'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChatProvider>
    <App />
  </ChatProvider>
)
