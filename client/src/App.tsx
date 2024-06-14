import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import './App.css'
import './Buttons.css'

import Home from './pages/Home'
import Navigationbar from './layouts/NavigationBar';
import MembersPage from './pages/members/MembersPage';
import SearchContextProvider from './context/SearchContextProvider';

function App() {

  return (
    <div className='app'>
      <Router>
        <SearchContextProvider>
          <Navigationbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/members/*' element={<MembersPage />} />
            <Route path='*' element={<Navigate to="/" />} />
          </Routes>
        </SearchContextProvider >
      </Router>
    </div>
  )
}

export default App
