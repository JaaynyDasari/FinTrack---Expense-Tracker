import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import ExpenseHistory from './pages/ExpenseHistory'
import Analytics from './pages/Analytics'
import ExpenseForm from './components/ExpenseForm'
import { ExpenseProvider } from './contexts/ExpenseContext'

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  
  const toggleForm = () => {
    setIsFormOpen(!isFormOpen)
  }

  return (
    <ExpenseProvider>
      <div className="app radial-background min-h-screen font-poppins text-darkText">
        <Navbar />
        
        <div className="pb-20">
          <Routes>
            <Route path="/" element={<Dashboard toggleForm={toggleForm} />} />
            <Route path="/history" element={<ExpenseHistory />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </div>
        
        {isFormOpen && (
          <ExpenseForm 
            isOpen={isFormOpen} 
            onClose={() => setIsFormOpen(false)}
          />
        )}
        
        <button 
          onClick={toggleForm}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary text-white text-3xl flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors z-10"
          aria-label="Add expense"
        >
          +
        </button>
      </div>
    </ExpenseProvider>
  )
}

export default App