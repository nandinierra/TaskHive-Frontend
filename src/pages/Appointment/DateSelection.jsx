const DateSelection = ({ selectedDate, setSelectedDate, dateOptions }) => {
  return (
    <div className="md:col-span-2">
      <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {dateOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setSelectedDate(option.value)}
            className={`py-2 px-3 text-sm rounded-md border transition-colors ${
              selectedDate === option.value
                ? 'bg-blue-100 text-blue-700 border-blue-300'
                : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DateSelection;