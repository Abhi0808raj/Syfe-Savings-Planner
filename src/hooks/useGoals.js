import { useState, useRef } from "react";

export const useGoals = () => {
  const [goals, setGoals] = useState([]);
  const [loading] = useState(false);

  const goalIdCounter = useRef(1);
  const contributionIdCounter = useRef(1);

  const addGoal = (goalData) => {
    const newGoal = {
      id: goalIdCounter.current++,
      name: goalData.name,
      targetAmount: goalData.targetAmount,
      currency: goalData.currency,
      contributions: [],
      createdAt: new Date().toISOString(),
    };
    setGoals((prev) => [...prev, newGoal]);
    return newGoal;
  };

  const updateGoal = (goalId, updates) => {
    setGoals((prev) =>
      prev.map((goal) => (goal.id === goalId ? { ...goal, ...updates } : goal))
    );
  };
  const deleteGoal = (goalId) => {
    setGoals((prev) => prev.filter((goal) => goal.id !== goalId));
  };

  const addContribution = (goalId, contributionData) => {
    const newContribution = {
      id: contributionIdCounter.current++,
      amount: contributionData.amount,
      currency: contributionData.currency,
      date: contributionData.date,
    };

    setGoals((prev) =>
      prev.map((goal) =>
        goal.id === goalId
          ? {
              ...goal,
              contributions: [...(goal.contributions || []), newContribution],
            }
          : goal
      )
    );
    return newContribution;
  };
  return {
    goals,
    loading,
    addGoal,
    updateGoal,
    deleteGoal,
    addContribution,
  };
};
