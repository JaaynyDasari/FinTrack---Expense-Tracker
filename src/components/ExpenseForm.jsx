import { useState, useEffect } from 'react'
import { useExpenses } from '../contexts/ExpenseContext'
import DatePicker from 'react-datepicker'

const ExpenseForm = ({ isOpen, onClose, expenseToEdit = null }) => {
  const { addExpense, updateExpense, categories } = useExpenses()
  
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    date: new Date()
  })
  
  const [errors, setErrors] = useState({})
  
  useEffect(() => {
    if (expenseToEdit) {
      setFormData({
        title: expenseToEdit.title,
        amount: expenseToEdit.amount.toString(),
        category: expenseToEdit.category,
        date: new Date(expenseToEdit.date)
      })
    }
  }, [expenseToEdit])
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: null })
    }
  }
  
  const handleDateChange = (date) => {
    setFormData({ ...formData, date })
  }
  
  const validate = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }
    
    if (!formData.amount) {
      newErrors.amount = 'Amount is required'
    } else if (isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be a positive number'
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validate()) return
    
    const expenseData = {
      ...formData,
      amount: parseFloat(formData.amount)
    }
    
    try {
      if (expenseToEdit) {
        await updateExpense(expenseToEdit.id, expenseData)
      } else {
        await addExpense(expenseData)
      }
      onClose()
    } catch (error) {
      console.error('Failed to save expense:', error)
    }
  }
  
  if (!isOpen) return null
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div 
        className="bg-white rounded-xl w-full max-w-md mx-4 overflow-hidden animate-[fadeIn_0.3s]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-primary to-secondary p-4">
          <h2 className="text-xl font-bold text-white">
            {expenseToEdit ? 'Edit Expense' : 'Add New Expense'}
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`input-field ₹{errors.title ? 'border-danger' : ''}`}
              placeholder="e.g. Grocery shopping"
            />
            {errors.title && (
              <p className="text-danger text-xs mt-1">{errors.title}</p>
            )}
          </div>
          
          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
              Amount (₹)
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className={`input-field ₹{errors.amount ? 'border-danger' : ''}`}
              placeholder="0.00"
              step="0.01"
              min="0"
            />
            {errors.amount && (
              <p className="text-danger text-xs mt-1">{errors.amount}</p>
            )}
          </div>
          
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`input-field ₹{errors.category ? 'border-danger' : ''}`}
            >
              <option value="">Select category</option>
              {categories.map(category => (
                <option key={category.id} value={category.name}>
                  {category.icon} {category.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-danger text-xs mt-1">{errors.category}</p>
            )}
          </div>
          
          <div className="mb-6">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <DatePicker
              selected={formData.date}
              onChange={handleDateChange}
              className="input-field"
              dateFormat="MMMM d, yyyy"
              maxDate={new Date()}
            />
          </div>
          
          <div className="flex justify-end space-x-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 border border-gray-300 rounded-lg text-darkText hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="gradient-button"
            >
              {expenseToEdit ? 'Update Expense' : 'Add Expense'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ExpenseForm