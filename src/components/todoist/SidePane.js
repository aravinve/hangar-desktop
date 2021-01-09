import AddTodo from './AddTodo'

function SidePane({addTodo, handleChange, searchTodo, handleSelectChange, modifyPaneState, resetDateFilter, resetCategoryFilter, resetImportanceFilter, showFilters, clearAddTerm, clearSearchTerm}) {

  const paneStyle = {
    top: '2rem',
    left: '2rem'
  }

  const classListFilter = showFilters ? 'rounded-tl-md' : 'rounded-t-md'

  return (
    <div
      className='absolute w-auto h-auto shadow-md rounded-md bg-secondary'
      style={paneStyle}>
      <div className="flex flex-row justify-center">
        <nav>
          <p className={`bg-primary w-full p-2 ${classListFilter} inline-flex items-center text-secondary text-xl select-none`}>
          <i className="fas fa-check-square mr-2"></i> Todoist</p>
          <AddTodo addTodo={addTodo} clearAddTerm={clearAddTerm} />
          <div className='flex flex-row pt-4 pl-4 pr-4 pb-0'>
            <div className="flex-1 inline-flex">
            <p className='text-primary text-sm inline-flex items-center'>
            <i className='fas fa-search mr-2'></i>
              <div className="inline-flex bg-white items-center justify-center rounded-md shadow-md mr-2">
                <input
                  className='text-sm text-primary p-1 rounded-l-md outline-none focus:outline-none disabled:cursor-not-allowed'
                  type='text'
                  name='searchTerm'
                  placeholder='Search Todo'
                  onChange={handleChange}
                  id='search-filter-todo'
                />
                 <div className="rounded-r-md p-1">
                  <i className='fas fa-times cursor-pointer text-primary text-xs' onClick={clearSearchTerm}></i>
                </div>
              </div>
            </p>
            <button
              className='bg-primary cursor-pointer text-secondary text-sm p-1 rounded-sm focus:outline-none'
              onClick={searchTodo}>
              Search
            </button>
            </div>
          </div>
          <div className="flex flex-row items-end p-4">
              <div className="flex-1 inline-flex flex-row"> 
              <p className="text-primary text-sm mr-24 select-none">
              <i className='fas fa-filter mr-2'></i> Todo Filters
              </p>
              <button className="p-1 ml-4 text-secondary text-sm bg-primary rounded-sm focus:outline-none outline-none cursor-pointer" onClick={modifyPaneState}>
                {showFilters ? 'Clear All Filters' : 'Show Filters'}
              </button>
              </div>
          </div>
        </nav>
        {showFilters ? (<>
          <nav>
          <p className='bg-primary w-full p-2 inline-flex items-center text-secondary text-xl select-none'>&nbsp;</p>
          <div className="flex flex-row items-end p-2">
            <div className="flex-1 mr-4">&nbsp;</div>
            <div className="flex-1 text-primary text-sm underline cursor-pointer" onClick={resetDateFilter}>
            <i className='fas fa-ban mr-1'></i>Clear Filter
            </div>
          </div>
          <div className='flex flex-row p-4'>
            <div className='flex-1 inline-flex'>
              <p className='text-primary text-sm inline-flex items-center mr-2'>
              <i className='fas fa-calendar-alt mr-2'></i>
                By Date</p>
            </div>
            <div className='inline-flex items-center m-1'>
              <select
                name='filterByDate'
                id='todo-filter-by-date'
                className="cursor-pointer rounded-md shadow-md p-1 text-sm text-primary outline-none focus:outline-none"
                defaultValue='default'
                onChange={handleSelectChange}>
                <option value='default' disabled hidden>
                  Choose
                </option>
                <option value='today'>Today</option>
                <option value='next'>Next 7 Days</option>
                <option value='future'>Upcoming</option>
                <option value='past'>Archived</option>
              </select>
            </div>
          </div>
        </nav>
        <nav>
          <p className='bg-primary w-full p-2 inline-flex items-center text-secondary text-xl select-none'>&nbsp;</p>
          <div className="flex flex-row items-end p-2">
            <div className="flex-1 mr-4">&nbsp;</div>
            <div className="flex-1 text-primary text-sm underline cursor-pointer" onClick={resetCategoryFilter}>
            <i className='fas fa-ban mr-1'></i>Clear Filter
            </div>
          </div>
          <div className='flex flex-row p-4'>
            <div className='flex-1 inline-flex'>
              <p className='text-primary text-sm inline-flex items-center mr-2'>
              <i className='fas fa-th-large mr-2'></i>
                By Category</p>
            </div>
            <div className='inline-flex items-center m-1'>
              <select
                name='filterByCategory'
                id='todo-filter-by-category'
                className="cursor-pointer rounded-md shadow-md p-1 text-sm text-primary outline-none focus:outline-none"
                defaultValue='defaultOption'
                onChange={handleSelectChange}>
                <option value='defaultOption' disabled hidden>
                  Choose
                </option>
                <option value='default'>Default</option>
                <option value='home'>Personal</option>
                <option value='work'>Work</option>
                <option value='study'>Study</option>
                <option value='travel'>Travel</option>
              </select>
            </div>
          </div>
        </nav>
        <nav>
          <p className='bg-primary w-full p-2 rounded-tr-md inline-flex items-center text-secondary text-xl select-none'>&nbsp;</p>
          <div className="flex flex-row items-end p-2">
            <div className="flex-1 mr-4">&nbsp;</div>
            <div className="flex-1 text-primary text-sm underline cursor-pointer" onClick={resetImportanceFilter}>
            <i className='fas fa-ban mr-1'></i>Clear Filter
            </div>
          </div>
          <div className='flex flex-row p-4'>
            <div className='flex-1 inline-flex'>
              <p className='text-primary text-sm inline-flex items-center mr-2'>
              <i className='fas fa-info-circle mr-2'></i>
                By Importance</p>
            </div>
            <div className='inline-flex items-center m-1'>
              <select
                name='filterByImportance'
                id='todo-filter-by-importance'
                className="cursor-pointer rounded-md shadow-md p-1 text-sm text-primary outline-none focus:outline-none"
                defaultValue='default'
                onChange={handleSelectChange}>
                <option value='default' disabled hidden>
                  Choose
                </option>
                <option value='high'>Urgent</option>
                <option value='imp'>Important</option>
                <option value='med'>Medium</option>
                <option value='nor'>Normal</option>
                <option value='low'>Low</option>
              </select>
            </div>
          </div>
        </nav>
        </>) : null}
      </div>
    </div>
  );
}

export default SidePane;
