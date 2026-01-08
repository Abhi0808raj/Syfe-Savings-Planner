import { useState } from 'react';
import {
  calculateSaved,
  calculateRemaining,
  convertCurrency
} from '../../utils/currency';

const AddContributionModal = ({
  isOpen,
  onClose,
  goal,
  exchangeRate,
  onAddContribution
}) => {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState(goal?.currency || 'INR');
  const [error, setError] = useState('');

  if (!isOpen || !goal) return null;

  const saved = calculateSaved(goal.contributions, goal.currency, exchangeRate);
  const remaining = calculateRemaining(goal.targetAmount, saved);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const numericAmount = Number(amount);

    if (!numericAmount || numericAmount <= 0) {
      setError('Enter a valid amount');
      return;
    }

    const amountInGoalCurrency = convertCurrency(
      numericAmount,
      currency,
      goal.currency,
      exchangeRate
    );

    if (amountInGoalCurrency > remaining) {
      setError('Amount exceeds remaining target');
      return;
    }

    onAddContribution(goal.id, {
      amount: numericAmount,
      currency,
      date: new Date().toISOString().split('T')[0]
    });

    setAmount('');
    setCurrency(goal.currency);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-2">Add Contribution</h3>

        <div className="text-sm text-gray-600 mb-4">
          <p><span className="font-medium">Goal:</span> {goal.name}</p>
          <p><span className="font-medium">Target:</span> {goal.targetAmount} {goal.currency}</p>
          <p><span className="font-medium">Remaining:</span> {remaining} {goal.currency}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Amount *</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Currency *</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="INR">INR</option>
              <option value="USD">USD</option>
            </select>
          </div>

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Add Contribution
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddContributionModal;
