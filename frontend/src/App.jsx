import { SignInButton } from "@clerk/react"
import { Routes, Route } from 'react-dom'
function App() {

  return (
    <div className='min-h-screen'>
      <NavBar />
      <main>
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