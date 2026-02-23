import { useMemo } from 'react'
import { useExpenses } from '../contexts/ExpenseContext'
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts'

const Analytics = () => {
  const { expenses, categories } = useExpenses()
  
  const categoryData = useMemo(() => {
    const categoryTotals = {}
    
    categories.forEach(cat => {
      categoryTotals[cat.name] = {
        name: cat.name,
        value: 0,
        color: cat.color,
        icon: cat.icon
      }
    })
    
    expenses.forEach(expense => {
      if (categoryTotals[expense.category]) {
        categoryTotals[expense.category].value += expense.amount
      }
    })
    
    return Object.values(categoryTotals)
      .filter(cat => cat.value > 0)
      .sort((a, b) => b.value - a.value)
  }, [expenses, categories])
  
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-md rounded-md border border-gray-200">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-primary font-bold">₹{payload[0].value.toFixed(2)}</p>
        </div>
      )
    }
    return null
  }
  


  return (
    <div className="page-container">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-darkText mb-2">Analytics</h1>
          <p className="text-gray-600">Visualize your spending patterns</p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 mb-8">
          {}
          <div className="card-bg p-6">
            <h2 className="section-title">Spending by Category</h2>
            
            {categoryData.length === 0 ? (
              <div className="h-80 flex items-center justify-center text-gray-500">
                <p>Add some expenses to see your category breakdown</p>
              </div>
            ) : (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                      nameKey="name"
                      label={({ name, icon }) => `₹{icon} ₹{name}`} 
                      labelLine={false}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-₹{index}`} fill={entry.color} /> 
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
            
            {/* Legend */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              {categoryData.map(category => (
                <div 
                  key={category.name} 
                  className="flex items-center p-2 rounded-md"
                  style={{ backgroundColor: `₹{category.color}15` }} 
                >
                  <div 
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <span>{category.icon} {category.name}</span>
                  <span className="ml-auto font-medium">
                    ₹{category.value.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {}
        </div>
        
        {}
        <div className="card-bg p-6">
          <h2 className="section-title">Spending Insights</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-primary/10 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-600 mb-1">Total Transactions</h3>
              <p className="text-2xl font-bold text-primary">{expenses.length}</p>
            </div>
            
            <div className="bg-secondary/10 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-600 mb-1">Average Expense</h3>
              <p className="text-2xl font-bold text-secondary">
                ₹{expenses.length 
                  ? (expenses.reduce((sum, exp) => sum + exp.amount, 0) / expenses.length).toFixed(2) 
                  : '0.00'
                }
              </p>
            </div>
            
            <div className="bg-accent/10 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-600 mb-1">Highest Expense</h3>
              <p className="text-2xl font-bold text-accent">
                ₹{expenses.length 
                  ? Math.max(...expenses.map(exp => exp.amount)).toFixed(2)
                  : '0.00'
                }
              </p>
            </div>
            
            <div className="bg-purple/10 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-600 mb-1">Active Categories</h3>
              <p className="text-2xl font-bold text-purple">
                {new Set(expenses.map(exp => exp.category)).size}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics