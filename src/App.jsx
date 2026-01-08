import { useState } from "react";
import Header from "./components/Common/Header";
import Dashboard from "./components/Dashboard/Dashboard";
import { useGoals } from "./hooks/useGoals";
import { useExchangeRate } from "./hooks/useExchangeRate";
import AddGoalForm from "./components/GoalCard/AddGoalForm";
import GoalCard from "./components/GoalCard/GoalCard";

function App() {
  const { goals,addGoal, loading: goalsLoading } = useGoals();
  const { exchangeRate, loading: rateLoading, lastUpdated, fetchExchangeRate } = useExchangeRate();

  const loading = goalsLoading || rateLoading;
  const handleAddGoal=(goalData)=>{
    addGoal(goalData);
  }
  const handleDelete=(goalId)=>{
    deleteGoal(goalId);
  }
  const handleAddContribution=(goalId,contributionData)=>{}

  return (
    <div className="min-h-screen py-8 w-screen px-6 sm:px-6 lg:px-8">
      <div className="">
        <Header />
        <Dashboard
          goals={goals}
          exchangeRate={exchangeRate || 90}
          lastUpdated={lastUpdated}
          refreshRate={fetchExchangeRate}
          loading={loading}
        />
        <AddGoalForm onAddGoal={handleAddGoal} />
        <GoalCard 
        goal={goals}
        exchangeRate={exchangeRate || 90}
        onAddContribution={handleAddContribution}
        onDeleteGoal={handleDelete}
        />
      </div>
    </div>
  );
}

export default App;
