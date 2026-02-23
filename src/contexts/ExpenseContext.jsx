import { createContext, useState, useEffect, useContext } from 'react'
import { toast } from 'react-toastify'
import { formatDistanceToNow } from 'date-fns'
import api from '../services/api'

const ExpenseContext = createContext()

export function useExpenses() {
  return useContext(ExpenseContext)
}

export function ExpenseProvider({ children }) {
  const [expenses, setExpenses] = useState([])
  const [categories, setCategories] = useState([])
  const [budget, setBudget] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        
        const [expensesRes, categoriesRes, budgetRes] = await Promise.all([
          api.getExpenses(),
          api.getCategories(),
          api.getBudget()
        ])
        
        setExpenses(expensesRes)
        setCategories(categoriesRes)
        setBudget(budgetRes.total)
        setError(null)
      } catch (err) {
        setError('Failed to load data')
        toast.error('Failed to load data')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const addExpense = async (newExpense) => {
    try {
      const response = await api.addExpense(newExpense)
      setExpenses([...expenses, response])
      toast.success('Expense added successfully!')
      return response
    } catch (err) {
      toast.error('Failed to add expense')
      throw err
    }
  }

  const updateExpense = async (id, updatedExpense) => {
    try {
      const response = await api.updateExpense(id, updatedExpense)
      setExpenses(expenses.map(expense => 
        expense.id === id ? response : expense
      ))
      toast.success('Expense updated successfully!')
      return response
    } catch (err) {
      toast.error('Failed to update expense')
      throw err
    }
  }

  const deleteExpense = async (id) => {
    try {
      await api.deleteExpense(id)
      setExpenses(expenses.filter(expense => expense.id !== id))
      toast.success('Expense deleted successfully!')
    } catch (err) {
      toast.error('Failed to delete expense')
      throw err
    }
  }

  const updateBudget = async (newBudget) => {
    try {
      const response = await api.updateBudget(newBudget)
      setBudget(response.total)
      toast.success('Budget updated successfully!')
      return response
    } catch (err) {
      toast.error('Failed to update budget')
      throw err
    }
  }

  // Helper functions
  const getTotalExpenses = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0)
  }

  const getRemainingBudget = () => {
    return budget - getTotalExpenses()
  }

  const formatTimeAgo = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true })
  }
  
  const getCategoryDetails = (categoryName) => {
    return categories.find(cat => cat.name === categoryName) || 
      { color: '#B0B0B0', icon: '📌' }
  }

  const value = {
    expenses,
    categories,
    budget,
    isLoading,
    error,
    addExpense,
    updateExpense,
    deleteExpense,
    updateBudget,
    getTotalExpenses,
    getRemainingBudget,
    formatTimeAgo,
    getCategoryDetails
  }

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  )
}