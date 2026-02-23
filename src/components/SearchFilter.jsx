import { useState } from 'react'

const SearchFilter = ({ onSearch, categories }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [dateRange, setDateRange] = useState('all')
  
  const handleSearch = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    onSearch({ term: value, category: selectedCategory, dateRange })
  }
  
  const handleCategoryChange = (e) => {
    const value = e.target.value
    setSelectedCategory(value)
    onSearch({ term: searchTerm, category: value, dateRange })
  }
  
  const handleDateRangeChange = (e) => {
    const value = e.target.value
    setDateRange(value)
    onSearch({ term: searchTerm, category: selectedCategory, dateRange: value })
  }
  
  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('')
    setDateRange('all')
    onSearch({ term: '', category: '', dateRange: 'all' })
  }
  
  const isFilterActive = searchTerm || selectedCategory || dateRange !== 'all'
  
  return (
    <div className="card-bg p-4 md:p-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-grow">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search expenses..."
              className="input-field pl-10"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 md:gap-3 flex-shrink-0">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="input-field py-2"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.name}>
                {category.icon} {category.name}
              </option>
            ))}
          </select>
          
          <select
            value={dateRange}
            onChange={handleDateRangeChange}
            className="input-field py-2"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
          
          {isFilterActive && (
            <button 
              onClick={clearFilters}
              className="py-2 px-3 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm transition-colors"
              aria-label="Clear filters"
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchFilter