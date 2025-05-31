import { useMemo } from 'react'
import { useExpenses } from '../contexts/ExpenseContext'
import ExpenseSummary from '../components/ExpenseSummary'
import ExpenseList from '../components/ExpenseList'
import CategorySummary from '../components/CategorySummary'

const Dashboard = ({ toggleForm }) => {
  const { expenses, categories, isLoading, error } = useExpenses() 
  
  const categorySpendingData = useMemo(() => {
    if (!expenses || !categories) return [];

    const categoryTotals = {};
    
    categories.forEach(cat => {
      categoryTotals[cat.name] = {
        name: cat.name,
        color: cat.color,
        icon: cat.icon,
        spent: 0,
      };
    });
    
    expenses.forEach(expense => {
      if (categoryTotals[expense.category]) {
        categoryTotals[expense.category].spent += expense.amount;
      }
      
    });
    
   
    return Object.values(categoryTotals)
      .filter(cat => cat.spent > 0)
      .sort((a, b) => b.spent - a.spent);
  }, [expenses, categories]);

  const totalOverallExpenses = useMemo(() => {
    if (!expenses) return 0;
    return expenses.reduce((sum, exp) => sum + exp.amount, 0);
  }, [expenses]);

  if (isLoading) {
    return (
      <div className="page-container flex justify-center items-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <p className="mt-2 text-gray-600">Loading your expenses...</p>
        </div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="page-container">
        <div className="bg-danger/10 p-4 rounded-lg text-danger">
          <p className="font-medium">Error: {error}</p>
          <p className="text-sm mt-1">
            Try refreshing the page or check your connection.
          </p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="page-container">
      <div className="max-w-7xl mx-auto">
        <div className="absolute top-20 left-0 w-full h-96 overflow-hidden -z-10">
          <div className="absolute top-0 left-0 w-40 h-40 rounded-full bg-primary/5 blur-3xl"></div>
          <div className="absolute top-40 right-10 w-60 h-60 rounded-full bg-secondary/5 blur-3xl"></div>
          <div className="absolute bottom-0 left-1/3 w-40 h-40 rounded-full bg-accent/5 blur-3xl"></div>
        </div>
        
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-darkText mb-2">
            Hi there! 👋
          </h1>
          <p className="text-gray-600">Track your expenses easily with FinTrack</p>
        </div>

        <button 
          onClick={toggleForm}
          className="w-full mb-6 gradient-button"
        >
          Add New Expense
        </button>
        
        <div className="space-y-8">
          <ExpenseSummary />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <ExpenseList />
            </div>
            
            <div>
              {}
              <CategorySummary 
                summaryData={categorySpendingData} 
                totalExpenses={totalOverallExpenses} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard