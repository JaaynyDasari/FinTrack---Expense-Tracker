import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
<<<<<<< HEAD
import { HashRouter } from "react-router-dom";
=======
import { BrowserRouter } from 'react-router-dom'
>>>>>>> 72fd91e65eeb53585deee7fd9b6d39ab6b2915c6
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'react-datepicker/dist/react-datepicker.css'

import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
<<<<<<< HEAD
<HashRouter>
        <App />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </HashRouter>
=======
    <BrowserRouter>
      <App />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </BrowserRouter>
>>>>>>> 72fd91e65eeb53585deee7fd9b6d39ab6b2915c6
  </StrictMode>,
)