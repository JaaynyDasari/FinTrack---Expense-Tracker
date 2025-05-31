import { useState } from 'react'
import { useExpenses } from '../contexts/ExpenseContext'
import { format } from 'date-fns'
import ExpenseForm from './ExpenseForm'

const ExpenseList = ({ limit = 5, showViewAll = true }) => {
  const { expenses, getCategoryDetails, deleteExpense } = useExpenses()
  const [editingExpense, setEditingExpense] = useState(null)
  
  const sortedExpenses = [...expenses]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit)

  const handleDelete = (id, e) => {
    e.stopPropagation()
    if (window.confirm('Are you sure you want to delete this expense?')) {
      deleteExpense(id)
    }
  }

  const handleEdit = (expense, e) => {
    e.stopPropagation()
    setEditingExpense(expense)
  }

  return (
    <div className="card-bg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="section-title mb-0">Recent Expenses</h2>
        {showViewAll && (
          <a href="/history" className="text-primary text-sm hover:underline">
            View all
          </a>
        )}
      </div>

      {sortedExpenses.length === 0 ? (
        <div className="text-center py-6 text-gray-500">
          <p className="text-lg mb-2">No expenses yet</p>
          <p className="text-sm">Add your first expense to get started!</p>
        </div>
      ) : (
        <div className="space-y-2">
          {sortedExpenses.map((expense) => {
            const category = getCategoryDetails(expense.category)
            
            return (
              <div 
                key={expense.id}
                className="expense-row"
                style={{ 
                  borderLeft: `4px solid ₹{category.color}`,
                }}
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
                      <span>{format(new Date(expense.date), 'MMM dd, yyyy')}</span>
                      <span className="mx-2">•</span>
                      <span>{expense.category}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <span className="font-bold mr-4">₹{expense.amount.toFixed(2)}</span>
                  <div className="flex space-x-1">
                    <button 
                      onClick={(e) => handleEdit(expense, e)}
                      className="p-1 text-gray-500 hover:text-primary transition-colors"
                      aria-label="Edit expense"
                    >
                      ✏️
                    </button>
                    <button 
                      onClick={(e) => handleDelete(expense.id, e)}
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
      )}

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

export default ExpenseList