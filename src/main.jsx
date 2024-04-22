import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom'
import ContextsAPI from './Context/ContextsAPI.jsx'
import TokenAuth from './Context/TokenAuth.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextsAPI>
      <TokenAuth>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TokenAuth>
    </ContextsAPI>
  </React.StrictMode>,
)
