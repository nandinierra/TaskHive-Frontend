const TimeSlotSelection = ({ 
  selectedDate, 
  selectedSlot, 
  setSelectedSlot, 
  loadingSlots, 
  allTimeSlots, 
  isSlotAvailable 
}) => {
  return (
    <div className="md:col-span-2">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Available Time Slots {selectedDate && `for ${new Date(selectedDate).toLocaleDateString('en-IN', { weekday: 'long', month: 'short', day: 'numeric' })}`}
      </label>
      
      {loadingSlots ? (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {allTimeSlots.map((slot) => {
            const isAvailable = isSlotAvailable(selectedDate, slot);
            const isSelected = selectedSlot === slot;
            
            return (
              <button
                key={slot}
                type="button"
                disabled={!isAvailable}
                onClick={() => setSelectedSlot(slot)}
                className={`py-2 px-3 text-sm rounded-md border transition-colors ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600'
                    : isAvailable
                    ? 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300'
                    : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                }`}
              >
                {slot}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TimeSlotSelection;