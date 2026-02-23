import { useExpenses } from '../contexts/ExpenseContext'

const CategorySummary = () => {
  const { expenses, categories } = useExpenses()
  
  const categoryTotals = categories.map(category => {
    const categoryExpenses = expenses.filter(exp => exp.category === category.name)
    const totalAmount = categoryExpenses.reduce((sum, exp) => sum + exp.amount, 0)
    const percentage = expenses.length > 0 
      ? (totalAmount / expenses.reduce((sum, exp) => sum + exp.amount, 0)) * 100 
      : 0
      
    return {
      ...category,
      totalAmount,
      percentage,
      count: categoryExpenses.length
    }
  })
  
  const sortedCategories = categoryTotals
    .filter(cat => cat.count > 0)
    .sort((a, b) => b.totalAmount - a.totalAmount)
    .slice(0, 4)
  
  return (
    <div className="card-bg p-6">
      <h2 className="section-title">Top Categories</h2>
      
      {sortedCategories.length === 0 ? (
        <div className="text-center py-4 text-gray-500">
          <p>No category data available</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedCategories.map((category) => (
            <div key={category.id} className="category-item">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center">
                  <span className="mr-2 text-lg">{category.icon}</span>
                  <span className="font-medium">{category.name}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold">₹{category.totalAmount.toFixed(2)}</span>
                  <span className="text-xs text-gray-500 ml-1">
                    ({category.percentage.toFixed(1)}%)
                  </span>
                </div>
              </div>
              
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full transition-all duration-500 ease-out"
                  style={{ 
                    width: `₹{category.percentage}%`,
                    backgroundColor: category.color 
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CategorySummary