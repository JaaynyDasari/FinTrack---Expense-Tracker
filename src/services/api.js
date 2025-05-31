const initialData = {
  expenses: [
    {
      id: 1,
      title: "Groceries",
      amount: 2500,
      category: "Food",
      date: "2025-07-10T12:00:00.000Z"
    },
    {
      id: 2,
      title: "Movie Tickets",
      amount: 800,
      category: "Entertainment",
      date: "2025-07-09T18:30:00.000Z"
    },
    {
      id: 3,
      title: "Electric Bill",
      amount: 3000,
      category: "Bills",
      date: "2025-07-05T09:00:00.000Z"
    }
  ],
  categories: [
    {"id": 1, "name": "Food", "color": "#FF6B6B", "icon": "🍔"},
    {"id": 2, "name": "Entertainment", "color": "#6A4C93", "icon": "🎬"},
    {"id": 3, "name": "Bills", "color": "#00BFA6", "icon": "📝"},
    {"id": 4, "name": "Transport", "color": "#FFD166", "icon": "🚗"},
    {"id": 5, "name": "Shopping", "color": "#5C67F2", "icon": "🛍️"},
    {"id": 6, "name": "Health", "color": "#FF9E7D", "icon": "💊"},
    {"id": 7, "name": "Education", "color": "#61A0FF", "icon": "📚"},
    {"id": 8, "name": "Other", "color": "#B0B0B0", "icon": "📌"}
  ],
  budget: {
    total: 15000
  }
}

if (!localStorage.getItem('expenseData')) {
  localStorage.setItem('expenseData', JSON.stringify(initialData))
}

const getData = () => {
  return JSON.parse(localStorage.getItem('expenseData'))
}

const saveData = (data) => {
  localStorage.setItem('expenseData', JSON.stringify(data))
}


export const getExpenses = async () => {
  const data = getData()
  return data.expenses
}

export const getExpense = async (id) => {
  const data = getData()
  return data.expenses.find(expense => expense.id === id)
}

export const addExpense = async (expense) => {
  const data = getData()
  const newExpense = {
    ...expense,
    id: Date.now()
  }
  data.expenses.push(newExpense)
  saveData(data)
  return newExpense
}

export const updateExpense = async (id, expense) => {
  const data = getData()
  const index = data.expenses.findIndex(e => e.id === id)
  if (index !== -1) {
    data.expenses[index] = { ...expense, id }
    saveData(data)
    return data.expenses[index]
  }
  throw new Error('Expense not found')
}

export const deleteExpense = async (id) => {
  const data = getData()
  data.expenses = data.expenses.filter(expense => expense.id !== id)
  saveData(data)
  return id
}


export const getCategories = async () => {
  const data = getData()
  return data.categories
}

export const getBudget = async () => {
  const data = getData()
  return data.budget
}

export const updateBudget = async (total) => {
  const data = getData()
  data.budget.total = total
  saveData(data)
  return data.budget
}

export default {
  getExpenses,
  getExpense,
  addExpense,
  updateExpense,
  deleteExpense,
  getCategories,
  getBudget,
  updateBudget
}