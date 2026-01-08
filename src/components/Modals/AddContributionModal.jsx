import { useState } from 'react';
import { calculateSaved, calculateRemaining, convertCurrency } from '../../utils/currency';

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
    <div>
      <h3>Add Contribution</h3>
      <p><strong>Goal:</strong> {goal.name}</p>
      <p><strong>Target:</strong> {goal.targetAmount} {goal.currency}</p>
      <p><strong>Remaining:</strong> {remaining} {goal.currency}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div>
          <label>Currency:</label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="INR">INR</option>
            <option value="USD">USD</option>
          </select>
        </div>

        {error && <p>{error}</p>}

        <div>
          <button type="submit">Add Contribution</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddContributionModal;
