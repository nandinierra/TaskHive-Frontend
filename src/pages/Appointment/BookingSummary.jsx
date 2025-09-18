const BookingSummary = ({ serviceType, servicePrice, taxAmount, totalPrice, formatCurrency }) => {
  return (
    <div className="md:col-span-2 bg-blue-50 p-4 rounded-lg">
      <h3 className="font-medium text-gray-900 mb-2">Booking Summary</h3>
      <div className="flex justify-between">
        <span>Service Fee ({serviceType})</span>
        <span className="font-medium">{formatCurrency(servicePrice)}</span>
      </div>
      <div className="flex justify-between mt-1 text-sm">
        <span>GST (18%)</span>
        <span className="font-medium">{formatCurrency(taxAmount)}</span>
      </div>
      <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between font-semibold">
        <span>Total Amount</span>
        <span className="text-blue-600">{formatCurrency(totalPrice)}</span>
      </div>
      <p className="text-xs text-gray-500 mt-2">* Final amount may vary based on actual service time</p>
    </div>
  );
};

export default BookingSummary;
