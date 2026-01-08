import React from 'react'
import { AlertCircle, Plus } from 'lucide-react';

export const AddGoalForm = ({ onAddGoal, maxGoals = 20, currentGoalsCount = 0 }) => {
  const [showForm, setShowForm] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    targetAmount: '',
    currency: 'INR',
  });
  const [error, setError] = React.useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Please enter a goal name';
    else if (formData.name.length > 50) newErrors.name = 'Goal name is too long';

    const amount = formData.targetAmount;
    if (amount === '' || amount === null) newErrors.targetAmount = 'Please enter a target amount';
    else if (isNaN(amount) || Number(amount) <= 0) newErrors.targetAmount = 'Please enter a valid amount';
    else if (Number(amount) > 1e9) newErrors.targetAmount = 'Target amount exceeds limit';

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }

    onAddGoal({
      name: formData.name.trim(),
      targetAmount: formData.targetAmount,
      currency: formData.currency,
    });

    setFormData({
      name: '',
      targetAmount: '',
      currency: 'INR',
    });
    setError({});
    setShowForm(false);
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      targetAmount: '',
      currency: 'INR',
    });
    setError({});
    setShowForm(false);
  };

  const maxGoalsReached = currentGoalsCount >= maxGoals;
  if (!showForm) {
    return (
      <div className="max-w-md mx-auto">
        <button
          onClick={() => setShowForm(true)}
          disabled={maxGoalsReached}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-white ${
            maxGoalsReached ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          <Plus size={16} />
          <span className="font-medium">{maxGoalsReached ? 'Max Goals Reached' : 'Add Goal'}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Create New Goal</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Goal Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            maxLength={50}
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="e.g., Emergency Fund, Trip to Japan"
          />
          {error.name && (
            <p className="mt-1 flex items-center gap-1 text-sm text-red-600">
              <AlertCircle size={14} />
              {error.name}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="targetAmount" className="block text-sm font-medium text-gray-700 mb-1">
              Target Amount *
            </label>
            <input
              type="number"
              id="targetAmount"
              name="targetAmount"
              value={formData.targetAmount}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="0"
              min="0"
            />
            {error.targetAmount && (
              <p className="mt-1 flex items-center gap-1 text-sm text-red-600">
                <AlertCircle size={14} />
                {error.targetAmount}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">
              Currency *
            </label>
            <select
              id="currency"
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="INR">INR</option>
              <option value="USD">USD</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            <Plus size={16} />
            Add Goal
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddGoalForm;

