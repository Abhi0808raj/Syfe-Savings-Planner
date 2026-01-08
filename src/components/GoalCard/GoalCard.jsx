import { Plus, Trash2, Calendar, DollarSign } from 'lucide-react';
import {
  formatCurrency,
  convertCurrency,
  calculateSaved,
  calculateProgress,
  calculateRemaining
} from '../../utils/currency';

const GoalCard = ({ goal, exchangeRate, onAddContribution, onDeleteGoal }) => {
  const saved = calculateSaved(goal.contributions, goal.currency, exchangeRate);
  const progress = calculateProgress(saved, goal.targetAmount);
  const remaining = calculateRemaining(goal.targetAmount, saved);

  const otherCurrency = goal.currency === 'INR' ? 'USD' : 'INR';
  const convertedTarget = convertCurrency(
    goal.targetAmount,
    goal.currency,
    otherCurrency,
    exchangeRate
  );

  const isCompleted = progress >= 100;

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border w-full">
      
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-800">{goal.name}</h3>
        <span className="text-sm text-gray-500">{progress}%</span>
      </div>

      <p className="text-blue-600 font-bold text-lg mb-3">
        {formatCurrency(goal.targetAmount, goal.currency)}
      </p>

      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
        <div
          className="bg-blue-600 h-2 rounded-full"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>

      <div className="flex justify-between text-sm text-gray-600 mb-4">
        <span>{formatCurrency(saved, goal.currency)} saved</span>
        <span>{formatCurrency(remaining, goal.currency)} remaining</span>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onAddContribution}
          className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus size={16} />
          Add Contribution
        </button>

        <button
          onClick={onDeleteGoal}
          className="flex items-center gap-2 px-3 py-2 text-sm bg-red-100 text-red-600 rounded-md hover:bg-red-200"
        >
          <Trash2 size={16} />
          Delete
        </button>
      </div>
    </div>
  );
};


export default GoalCard;
