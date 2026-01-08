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
      <div className={`goal-card ${isCompleted ? 'completed' : ''}`}>
        <div className="goal-info">
          <h3 className="goal-title">{goal.title}</h3>
          <p className="goal-amount">
            {formatCurrency(goal.targetAmount, goal.currency)}
          </p>
          <p className="goal-progress">
            {`Progress: ${progress}%`}
          </p>
        </div>
        <div className="goal-actions">
          <button onClick={onAddContribution} className="add-contribution">
            <Plus /> Add Contribution
          </button>
          <button onClick={onDeleteGoal} className="delete-goal">
            <Trash2 /> Delete Goal
          </button>
        </div>
      </div>
    );
};

export default GoalCard;
