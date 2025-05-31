import { useState, useMemo } from 'react'
import { format } from 'date-fns'
import { useExpenses } from '../contexts/ExpenseContext'
import SearchFilter from '../components/SearchFilter'
import ExpenseForm from '../components/ExpenseForm'

const ExpenseHistory = () => {
  const { expenses, categories, getCategoryDetails, deleteExpense } = useExpenses()
  const [editingExpense, setEditingExpense] = useState(null)
  const [filters, setFilters] = useState({
    term: '',
    category: '',
    dateRange: 'all'
  })
  
  const handleSearch = (searchParams) => {
    setFilters(searchParams)
  }
  
  const isInDateRange = (date, range) => {
    const expenseDate = new Date(date)
    const today = new Date()
    const startOfDay = new Date(today.setHours(0, 0, 0, 0))
    
    switch (range) {
      case 'today':
        return expenseDate >= startOfDay
      case 'week': {
        const startOfWeek = new Date(today)
        startOfWeek.setDate(today.getDate() - today.getDay())
        startOfWeek.setHours(0, 0, 0, 0)
        return expenseDate >= startOfWeek
      }
      case 'month': {
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
        return expenseDate >= startOfMonth
      }
      case 'year': {
        const startOfYear = new Date(today.getFullYear(), 0, 1)
        return expenseDate >= startOfYear
      }
      default:
        return true
    }
  }
  
  const filteredExpenses = useMemo(() => {
    return expenses.filter(expense => {
      const matchesTerm = filters.term 
        ? expense.title.toLowerCase().includes(filters.term.toLowerCase())
        : true
        
      const matchesCategory = filters.category
        ? expense.category === filters.category
        : true
        
      const matchesDate = isInDateRange(expense.date, filters.dateRange)
      
      return matchesTerm && matchesCategory && matchesDate
    })
  }, [expenses, filters])
  
  const groupedExpenses = useMemo(() => {
    const groups = {}
    
    filteredExpenses.forEach(expense => {
      const date = format(new Date(expense.date), 'yyyy-MM-dd')
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(expense)
    })
    
    return Object.keys(groups)
      .sort((a, b) => new Date(b) - new Date(a))
      .map(date => ({
        date,
        expenses: groups[date].sort((a, b) => new Date(b.date) - new Date(a.date))
      }))
  }, [filteredExpenses])
  
  const handleEdit = (expense) => {
    setEditingExpense(expense)
  }
  
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      deleteExpense(id)
    }
  }
  
  return (
    <div className="page-container">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-darkText mb-2">Expense History</h1>
          <p className="text-gray-600">View and manage all your past expenses</p>
        </div>
        
        <SearchFilter 
          onSearch={handleSearch} 
          categories={categories} 
        />
        
        {filteredExpenses.length === 0 ? (
          <div className="card-bg p-10 text-center">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-medium mb-2">No expenses found</h3>
            <p className="text-gray-600">
              {filters.term || filters.category || filters.dateRange !== 'all'
                ? 'Try adjusting your search filters'
                : 'Add your first expense to get started'}
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {groupedExpenses.map(group => (
              <div key={group.date} className="expense-group">
                <div className="sticky top-16 z-10 bg-lightBg py-2">
                  <h3 className="font-medium text-gray-700">
                    {format(new Date(group.date), 'EEEE, MMMM d, yyyy')}
                  </h3>
                </div>
                
                <div className="card-bg divide-y divide-gray-100">
                  {group.expenses.map(expense => {
                    const category = getCategoryDetails(expense.category)
                    
                    return (
                      <div 
                        key={expense.id} 
                        className="expense-row p-4 hover:bg-gray-50"
                      >
                        <div className="flex items-center">
                          <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center mr-3 text-xl"
                            style={{ backgroundColor: `₹{category.color}30` }}
                          >
                            {category.icon}
                          </div>
                          
                          <div>
                            <h3 className="font-medium">{expense.title}</h3>
                            <div className="flex text-xs text-gray-500">
                              <span>{format(new Date(expense.date), 'h:mm a')}</span>
                              <span className="mx-2">•</span>
                              <span 
                                className="category-badge" 
                                style={{ backgroundColor: category.color }}
                              >
                                {expense.category}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <span className="font-bold mr-4">₹{expense.amount.toFixed(2)}</span>
                          <div className="flex space-x-1">
                            <button 
                              onClick={() => handleEdit(expense)}
                              className="p-1 text-gray-500 hover:text-primary transition-colors"
                              aria-label="Edit expense"
                            >
                              ✏️
                            </button>
                            <button 
                              onClick={() => handleDelete(expense.id)}
                              className="p-1 text-gray-500 hover:text-danger transition-colors"
                              aria-label="Delete expense"
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {editingExpense && (
        <ExpenseForm 
          isOpen={!!editingExpense} 
          onClose={() => setEditingExpense(null)}
          expenseToEdit={editingExpense}
        />
      )}
    </div>
  )
}

export default ExpenseHistory