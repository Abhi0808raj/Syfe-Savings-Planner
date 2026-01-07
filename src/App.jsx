import { useState } from "react";
import Header from "./components/Common/Header";
import Dashboard from "./components/Dashboard/Dashboard";
import { useGoals } from "./hooks/useGoals";
import { useExchangeRate } from "./hooks/useExchangeRate";
import AddGoalForm from "./components/GoalCard/AddGoalForm";

function App() {
  const { goals,addGoal, loading: goalsLoading } = useGoals();
  const { exchangeRate, loading: rateLoading, lastUpdated, fetchExchangeRate } = useExchangeRate();

  const loading = goalsLoading || rateLoading;
  const handleAddGoal=(goalData)=>{
    addGoal(goalData);
  }

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
      </div>
    </div>
  );
}

export default App;
