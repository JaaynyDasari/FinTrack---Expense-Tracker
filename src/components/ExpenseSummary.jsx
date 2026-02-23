import { useExpenses } from '../contexts/ExpenseContext'

const ExpenseSummary = () => {
  const { budget, getTotalExpenses, getRemainingBudget } = useExpenses()
  
  const totalExpenses = getTotalExpenses()
  const remainingBudget = getRemainingBudget()
  const percentSpent = budget > 0 ? (totalExpenses / budget) * 100 : 0
  
  let statusColor = 'bg-secondary'
  if (percentSpent > 90) {
    statusColor = 'bg-danger'
  } else if (percentSpent > 70) {
    statusColor = 'bg-accent'
  }
  
  return (
    <div className="card-bg p-6 relative overflow-hidden">
      {}
      <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-primary/10 -z-10"></div>
      <div className="absolute -left-10 -bottom-10 w-32 h-32 rounded-full bg-secondary/10 -z-10"></div>
      
      <h2 className="section-title mb-6">Budget Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <p className="text-gray-500 mb-1">Total Budget</p>
          <div className="flex items-end">
            <span className="text-3xl font-bold">₹{budget.toFixed(2)}</span>
            <button className="ml-2 text-xs text-primary hover:text-primary/80">
              Edit
            </button>
          </div>
          
          <div className="mt-4">
            <p className="text-gray-500 mb-1">Budget Remaining</p>
            <span className={`text-2xl font-bold ₹{remainingBudget < 0 ? 'text-danger' : 'text-secondary'}`}>
              ₹{remainingBudget.toFixed(2)}
            </span>
          </div>
        </div>
        
        <div>
          <p className="text-gray-500 mb-1">Total Spent</p>
          <span className="text-3xl font-bold text-primary">₹{totalExpenses.toFixed(2)}</span>
          
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span className={remainingBudget < 0 ? 'text-danger' : ''}>{percentSpent.toFixed(0)}%</span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ₹{statusColor} transition-all duration-500 ease-out`}
                style={{ width: `₹{Math.min(percentSpent, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExpenseSummary