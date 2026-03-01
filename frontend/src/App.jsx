import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Navbar from './components/Layout/Navbar'
import Layout from './components/Layout/Layout'
import Home from './pages/Home'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Navbar />
        <Home />
      </Layout>
    </BrowserRouter>
  )
}

export default App
