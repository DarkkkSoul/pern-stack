import { Routes, Route } from 'react-router'
import Home from "./pages/Home"
import Product from "./pages/Product"
import Create from "./pages/Create"
import Edit from "./pages/Edit"
import Profile from "./pages/Profile"
import Navbar from './components/Navbar'
function App() {

  return (
    <div className='min-h-screen bg-base-100'>
      <Navbar />
      <main className='max-w-5xl mx-auto px-4 py-8'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product/:id' element={<Product />} />
          <Route path='/create' element={<Create />} />
          <Route path='/edit' element={<Edit />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </main>
    </div>
  )
}

export default App